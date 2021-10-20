import { ApolloClient, ApolloLink, FieldPolicy, HttpLink, InMemoryCache } from '@apollo/client';
import { __BACKEND__, __PROD__ } from '@utils/constants';
import { FilteredUsersResponse, TestPresetsResponse, UserFollowersResponse } from '@generated/graphql';
import { NextPageContext } from 'next';
import { createWithApollo } from './createWithApollo';
import { createLogger } from '../logging/mecha-logger';
import { offsetLimitPagination, relayStylePagination } from '@apollo/client/utilities';

const fileLabel = 'modules/core/apollo/apollo';
const logger = createLogger({
  fileLabel,
});

const apolloClient = (ctx: NextPageContext) => {
  const setCookiesAfterware = new ApolloLink((operation, forward) =>
    forward(operation).map((response) => {
      ctx?.res?.setHeader('set-cookie', operation.getContext().response.headers.raw()['set-cookie'] || '');
      return response;
    })
  );

  return new ApolloClient({
    link: setCookiesAfterware.concat(
      new HttpLink({
        uri: `${__BACKEND__}/graphql`,
        headers: { cookie: ctx?.req?.headers.cookie },
        credentials: 'include',
      })
    ),
    connectToDevTools: !__PROD__,
    headers: {
      cookie: (typeof window === 'undefined' ? ctx?.req?.headers.cookie : undefined) || '',
    },
    credentials: 'include',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            testPresets: {
              keyArgs: [],
              merge(existing: TestPresetsResponse | undefined, incoming: TestPresetsResponse): TestPresetsResponse {
                return {
                  ...incoming,
                  edges: [...(existing?.edges || []), ...incoming.edges],
                };
              },
            },
            userFollowers: {
              keyArgs: [],
              merge(
                existing: UserFollowersResponse | undefined,
                incoming: UserFollowersResponse
              ): UserFollowersResponse {
                return {
                  ...incoming,
                  edges: [...(existing?.edges || []), ...incoming.edges],
                };
              },
            },
          },
        },
      },
    }),
  });
};

export const withApollo = createWithApollo(apolloClient);

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { __BACKEND__ } from '@utils/constants';
import { FilteredUsersResponse } from '@generated/graphql';
import { NextPageContext } from 'next';
import { withApollo } from 'next-apollo';
import { createLogger } from '../logging/mecha-logger';

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
    headers: {
      cookie: (typeof window === 'undefined' ? ctx?.req?.headers.cookie : undefined) || '',
    },
    credentials: 'include',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            filterUsers: {
              keyArgs: [],
              merge(
                existing: FilteredUsersResponse | undefined,
                incoming: FilteredUsersResponse
              ): FilteredUsersResponse {
                return {
                  ...incoming,
                  nodes: [...(existing?.nodes || []), ...(incoming?.nodes || [])],
                };
              },
            },
          },
        },
      },
    }),
  });
};

export default withApollo(apolloClient);

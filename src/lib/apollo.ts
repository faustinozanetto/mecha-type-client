import { ApolloClient, InMemoryCache } from '@apollo/client';
import { __BACKEND__ } from '@utils/constants';
import { FilteredUsersResponse } from '@generated/graphql';
import { NextPageContext } from 'next';
import { createWithApollo } from './createWithApollo';

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: `${__BACKEND__}/graphql`,
    credentials: 'include',
    headers: {
      cookie: (typeof window === 'undefined' ? ctx?.req?.headers?.cookie : undefined) || '',
    },
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

export const withApollo = createWithApollo(createClient);

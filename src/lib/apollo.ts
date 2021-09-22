import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { __BACKEND__ } from '@utils/constants';
import { FilteredUsersResponse } from '@generated/graphql';
import { NextPageContext } from 'next';
import { createWithApollo } from './createWithApollo';

const httpLink = createHttpLink({ uri: `${__BACKEND__}/graphql`, credentials: 'include' });

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    link: httpLink,
    credentials: 'include',
    ssrMode: typeof window === 'undefined',
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

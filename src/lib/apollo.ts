import { withApollo } from 'next-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { __BACKEND__ } from '@utils/constants';
import { FilteredUsersResponse } from '@generated/graphql';

export const apolloClient = new ApolloClient({
  uri: __BACKEND__,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          filterUsers: {
            keyArgs: [],
            merge(existing: FilteredUsersResponse | undefined, incoming: FilteredUsersResponse): FilteredUsersResponse {
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
  credentials: 'include',
});

export default withApollo(apolloClient);

import { withApollo } from 'next-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { __BACKEND__ } from '@utils/constants';

export const apolloClient = new ApolloClient({
  uri: __BACKEND__,
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default withApollo(apolloClient);

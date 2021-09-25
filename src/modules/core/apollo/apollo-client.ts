import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash.isequal';
import { __BACKEND__ } from '@utils/constants';
import { useMemo } from 'react';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export type ApolloState = {
  [APOLLO_STATE_PROP_NAME]: NormalizedCacheObject;
};

let apolloClient: ApolloClient<NormalizedCacheObject>;

/**
 * Create a new apollo client instance.
 *
 * @returns {ApolloClient<NormalizedCacheObject>}
 */
const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink: ApolloLink = new HttpLink({
    uri: `${__BACKEND__}/graphql`,
    credentials: 'include',
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache({}),
  });
};

/**
 * Initiate apollo based on the environment (client or server).
 *
 * @param initialState
 * @returns {ApolloClient<NormalizedCacheObject>}
 */
export const initializeApollo = (initialState = null): ApolloClient<NormalizedCacheObject> => {
  const client = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    client.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
};

/**
 * Returns the apollo state.
 *
 * @param {ApolloClient<NormalizedCacheObject>} client
 * @returns {NormalizedCacheObject}
 */
export const getApolloState = (client: ApolloClient<NormalizedCacheObject>): NormalizedCacheObject => {
  return client.cache.extract();
};

/**
 * Returns an instance of apollo client.
 *
 * @param {PageProps} pageProps
 * @returns {ApolloClient<NormalizedCacheObject>}
 */
export const useApollo = <T>(pageProps: T): ApolloClient<NormalizedCacheObject> => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { TestPresetsResponse, UserFollowersResponse, FilteredUsersResponse } from '@generated/graphql';
import { __BACKEND__ } from '@utils/constants';
import { createUploadLink } from 'apollo-upload-client';
import merge from 'deepmerge';
import { IncomingHttpHeaders } from 'http';
import fetch from 'isomorphic-unfetch';
import isEqual from 'lodash/isEqual';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  const enhancedFetch = async (
    url: RequestInfo,
    init: RequestInit
  ): Promise<Response extends null | undefined ? never : Response> => {
    return await fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        Cookie: headers?.cookie ?? '',
      },
    }).then((response) => response);
  };

  const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    if (networkError) console.log(`[Network error]: ${networkError}. Backend is unreachable. Is it running?`);
  });

  const httpLink = new HttpLink({
    uri: `${__BACKEND__}/graphql`,
    credentials: 'include',
    // fetch: enhancedFetch,
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink ?? errorLink,
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
            filterUsers: {
              keyArgs: [],
              merge(
                existing: FilteredUsersResponse | undefined,
                incoming: FilteredUsersResponse
              ): FilteredUsersResponse {
                return {
                  ...incoming,
                  edges: [...(existing?.edges || []), ...incoming.edges],
                };
              },
            },
            userTestPresets: {
              keyArgs: [],
              merge(existing: TestPresetsResponse | undefined, incoming: TestPresetsResponse): TestPresetsResponse {
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

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: InitialState | null;
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = { headers: null, initialState: null }
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps: AppProps['pageProps']) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo({ initialState: state }), [state]);
  return store;
}

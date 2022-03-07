import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client';
import { __BACKEND__ } from '@utils/constants';
import { NextComponentType, NextPageContext } from 'next';

// @ts-ignore
let globalApolloClient: ApolloClient;

function initApolloClient(initialState) {
  if (!globalApolloClient) {
    globalApolloClient = new ApolloClient({
      link: new HttpLink({
        uri: `${__BACKEND__}/graphql`,
        fetch,
      }),
      cache: new InMemoryCache().restore(initialState || {}),
    });
  }
  // client side page transition to an SSG page => update Apollo cache
  else if (initialState) {
    globalApolloClient.cache.restore({
      ...globalApolloClient.cache.extract(),
      ...initialState,
    });
  }
  return globalApolloClient;
}

export function withApollo(PageComponent: NextComponentType<NextPageContext, any, {}>) {
  const WithApollo = ({ apolloStaticCache, ...pageProps }) => {
    // HERE WE USE THE PASSED CACHE
    const client = initApolloClient(apolloStaticCache);
    // and here we have the initialized client 🙂
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };
  // if you also use it for SSR
  if (PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async () => {
      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        // @ts-ignore
        pageProps = await PageComponent.getInitialProps(ctx);
      }
      return pageProps;
    };
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    WithApollo.displayName = `withApollo(${displayName})`;
  }
  return WithApollo;
}

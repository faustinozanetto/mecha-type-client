import React, { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@styles/global-styles';
import { useRouter } from 'next/router';
import * as gtag from '@lib/google/gtag';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@modules/core/apollo/apollo-client';
import AdSenseConnection from '@modules/core/adsense/adsense-connection';
import Script from 'next/script';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  const router = useRouter();
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        {/* Global AdSense */}

        <GlobalStyles />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default appWithTranslation(MechaApp);

import React, { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';
import GlobalStyles from '@styles/global-styles';
import * as gtag from '@modules/core/adsense/google-tag';
import '@fontsource/poppins';
import { useRouter } from 'next/router';
import { GoogleAnalytics } from '@components/google/google-analytics';
import { AuthProvider } from '@contexts/UserContext';
import mechaTheme from '@styles/theme';
import TypingGameProvider from '@contexts/typing-game.context';
import Script from 'next/script';
import { __URI__ } from '@utils/constants';
import { useApollo } from '@modules/core/apollo/ssg-apollo';
import { ApolloProvider } from '@apollo/client';
import cookies from 'cookies';
import { ChakraWrapper } from '@modules/core/chakra/chakra-wrapper';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ChakraWrapper reqCookies={pageProps.cookies}>
          <TypingGameProvider>
            <Script
              id="Adsense-id"
              async
              strategy="afterInteractive"
              onError={(e) => {
                console.error('Script failed to load', e);
              }}
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
                process.env.NEXT_PUBLIC_GOOGLE_ADSENSE as string
              }`}
              crossOrigin="anonymous"
            />
            <GoogleAnalytics />
            <GlobalStyles />
            <Component {...pageProps} />
          </TypingGameProvider>
        </ChakraWrapper>
      </AuthProvider>
    </ApolloProvider>
  );
};



export default appWithTranslation(MechaApp);

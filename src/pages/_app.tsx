import React, { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import GlobalStyles from '@styles/global-styles';
import * as gtag from '@modules/core/adsense/google-tag';
import '@fontsource/poppins';
import { useRouter } from 'next/router';
import { GoogleAnalytics } from '@components/google/google-analytics';
import useAuth, { AuthProvider } from '@contexts/UserContext';
import TypingGameProvider from '@contexts/typing-game.context';
import Script from 'next/script';
import { __URI__ } from '@utils/constants';
import { ApolloProvider } from '@apollo/client';
import { ThemeWrapper } from '@modules/core/theme/theme-wrapper';
import { useApollo } from '@modules/core/apollo/ssg-apollo';
import { Loading } from '@components/loading/loading';
import { withApollo } from '@modules/core/apollo/apollo';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps);
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  if (loading) {
    return <Loading />;
  }
  return (
    <ThemeWrapper>
      {/* <ApolloProvider client={apolloClient}> */}
      <AuthProvider>
        <TypingGameProvider>
          <GoogleAnalytics />
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
          <GlobalStyles />
          <Component {...pageProps} user={user} />
        </TypingGameProvider>
      </AuthProvider>
      {/* </ApolloProvider> */}
    </ThemeWrapper>
  );
};

export default withApollo()(appWithTranslation(MechaApp));

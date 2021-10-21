import React, { useEffect, useState } from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@styles/global-styles';
import { Provider } from 'react-redux';
import { store } from 'state';
import * as gtag from '@modules/core/adsense/google-tag';
import { useRouter } from 'next/router';
import { GoogleAnalytics } from '@components/google/google-analytics';
import { UserFragment, useMeQuery } from '@generated/graphql';
import { withApollo } from '@modules/core/apollo/apollo';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [me, setMe] = useState<UserFragment>();
  const { data: meUserData, loading: meLoading } = useMeQuery({ ssr: true });

  // Me data
  useEffect(() => {
    if (meUserData?.me?.user) {
      setMe(meUserData.me.user);
    }
  }, [meUserData, meLoading]);

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
    <Provider store={store}>
      <ChakraProvider>
        <GoogleAnalytics />
        <GlobalStyles />
        <Component {...pageProps} me={me ?? {}} />
      </ChakraProvider>
    </Provider>
  );
};

export default withApollo({})(appWithTranslation(MechaApp));

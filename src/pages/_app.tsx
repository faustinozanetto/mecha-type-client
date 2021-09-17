import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@styles/global-styles';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <ChakraProvider>
      <SessionProvider session={pageProps.session}>
        <GlobalStyles />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default appWithTranslation(MechaApp);

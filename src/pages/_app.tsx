import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { GlobalStyles } from '../styles';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

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

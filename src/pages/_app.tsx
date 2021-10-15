import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@styles/global-styles';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <ChakraProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default appWithTranslation(MechaApp);

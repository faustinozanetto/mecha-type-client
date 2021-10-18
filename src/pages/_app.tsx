import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@styles/global-styles';
import { Provider } from 'react-redux';
import { store } from 'state';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <ChakraProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default appWithTranslation(MechaApp);

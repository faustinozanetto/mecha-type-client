import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@styles/global-styles';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';

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

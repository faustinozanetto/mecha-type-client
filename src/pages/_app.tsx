import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@styles/global-styles';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@modules/core/apollo/apollo-client';
import userPracticeContext from '@modules/core/practice/user-practice-context';
import { getPracticeConfig } from '@modules/core/practice/practice-config-manager';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  const router = useRouter();
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <userPracticeContext.Provider value={{ ...getPracticeConfig() }}>
        <ChakraProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </ChakraProvider>
      </userPracticeContext.Provider>
    </ApolloProvider>
  );
};

export default appWithTranslation(MechaApp);

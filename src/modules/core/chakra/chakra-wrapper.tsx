import React from 'react';
import mechaTheme from '@styles/theme';
import cookies from 'cookies';
import { cookieStorageManager, localStorageManager, ChakraProvider } from '@chakra-ui/react';

interface ChakraWrapperProps {
  reqCookies: string;
  children: React.ReactNode;
}

export const ChakraWrapper: React.FC<ChakraWrapperProps> = (props) => {
  const { reqCookies, children } = props;
  const colorModeManager = typeof cookies === 'string' ? cookieStorageManager(reqCookies) : localStorageManager;

  return (
    <ChakraProvider theme={mechaTheme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  };
}

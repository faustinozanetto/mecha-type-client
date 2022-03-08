import React from 'react';
import mechaTheme from '@styles/theme';
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes';
import { ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react';

interface ChakraWrapperProps {
  children: React.ReactNode;
}

export type UseThemeProps = {
  resolvedTheme?: 'light' | 'dark';
  setTheme: (theme: string) => void;
};

export const ThemeWrapper: React.FC<ChakraWrapperProps> = (props) => {
  const { children } = props;
  const { resolvedTheme } = useNextTheme() as UseThemeProps;
  const colorModeConfig: ThemeConfig = {
    initialColorMode: resolvedTheme,
    useSystemColorMode: true, // change to false disable system-color-select
  };

  const customTheme = extendTheme({ ...mechaTheme, ...colorModeConfig });

  return (
    <NextThemeProvider attribute="class" enableSystem defaultTheme="system">
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
    </NextThemeProvider>
  );
};

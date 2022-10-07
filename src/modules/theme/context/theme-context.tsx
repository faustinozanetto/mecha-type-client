import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface IThemeContextProps {
  theme: 'dark' | 'light';
  change: (theme: IThemeContextProps['theme']) => void;
}

const initialState: IThemeContextProps = {
  theme: 'dark',
  change: (_theme) => {},
};

const ThemeContext = createContext<IThemeContextProps>(initialState);

interface IThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const { children } = props;
  const [theme, setTheme] = useState<IThemeContextProps['theme']>(initialState.theme);

  const change = useCallback((newTheme: IThemeContextProps['theme']) => {
    setTheme((prev) => {
      const documentElement = document.documentElement;

      // Remove classlist theme from the document element.
      if (documentElement) {
        documentElement.classList.remove(prev);

        // Add the new theme to the class list.
        documentElement.classList.add(newTheme);
      }

      return newTheme;
    });
  }, []);

  const memoizedValue = useMemo<IThemeContextProps>(
    () => ({
      theme,
      change,
    }),
    [theme, change]
  );

  return <ThemeContext.Provider value={memoizedValue}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  return useContext<IThemeContextProps>(ThemeContext);
};

export default ThemeProvider;

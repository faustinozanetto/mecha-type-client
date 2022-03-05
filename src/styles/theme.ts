import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const mechaTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'Poppins',
      },
    }),
  },
});
export default mechaTheme;

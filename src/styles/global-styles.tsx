import { Global } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <Global
      styles={`
      * {
        font-family: 'Poppins', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      html {
        text-rendering: optimizeLegibility;
        font-feature-settings: "kern";
      }
  `}
    />
  );
};

export default GlobalStyles;

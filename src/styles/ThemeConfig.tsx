import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *, ::before, ::after {
    border-width: 0px;
    border-style: solid;
    box-sizing: border-box;
  }

  *, ::before, ::after {
    border-color: rgba(255, 255, 255, 0.16);
    overflow-wrap: break-word;
  }

  html {
    text-rendering: optimizeLegibility;
  }

  body {
    background-color: #e0e1dd;
    font-feature-settings: "kern";
    margin: 0;
    padding: 0;
  }
`;

/**
 * List of allowed "Variable Fonts" that can be used in the project.
 *
 * @see https://fonts.google.com/specimen/Poppins
 */
export type AvailableFontFamilies = 'Poppins';
export type AvailableFontWeights = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type FontConfiguration = {
  fontName?: AvailableFontFamilies;
  fontWeights?: AvailableFontWeights[];
  format?: 'woff' | 'woff2' | 'ttf'; // Defaults to woff2
  fontFile?: string; // Defaults to "${fontName}-variable-latin.${format}"
};

export const fontConfigurations: FontConfiguration[] = [
  {
    fontName: 'Poppins',
    fontWeights: [400, 500, 600, 700, 800, 900],
  },
];

export const fontsBasePath = '/static/fonts';

/**
 *
 * @param fontFamily font family to create the inject css code
 * @returns the complete code to use in a css
 */
export const injectFontFamily = (fontFamily: FontConfiguration): string => {
  switch (fontFamily.fontName) {
    case 'Poppins': {
      return `
        @font-face {
          font-family: ${fontFamily.fontName};
          font-style: normal;
          font-weight: 400;
          font-display: optional;
          src: url(${fontsBasePath}/${fontFamily.fontName}/poppins-latin-400.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
          font-family: ${fontFamily.fontName};
          font-style: normal;
          font-weight: 500;
          font-display: optional;
          src: url(${fontsBasePath}/${fontFamily.fontName}/poppins-latin-500.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
          font-family: ${fontFamily.fontName};
          font-style: normal;
          font-weight: 600;
          font-display: optional;
          src: url(${fontsBasePath}/${fontFamily.fontName}/poppins-latin-600.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
          font-family: ${fontFamily.fontName};
          font-style: normal;
          font-weight: 700;
          font-display: optional;
          src: url(${fontsBasePath}/${fontFamily.fontName}/poppins-latin-700.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
          font-family: ${fontFamily.fontName};
          font-style: normal;
          font-weight: 800;
          font-display: optional;
          src: url(${fontsBasePath}/${fontFamily.fontName}/poppins-latin-800.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
          font-family: ${fontFamily.fontName};
          font-style: normal;
          font-weight: 900;
          font-display: optional;
          src: url(${fontsBasePath}/${fontFamily.fontName}/poppins-latin-900.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `;
    }
  }
};

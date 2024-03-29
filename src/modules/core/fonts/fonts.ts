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
    format: 'woff2',
    fontWeights: [400, 500, 600, 700, 800, 900],
  },
];

export const fontsBasePath = '/fonts';

const parseFontConfiguration = (fontFamily: FontConfiguration): string => {
  const fontFaces: string[] = fontFamily.fontWeights.map((weigth) => {
    return `
        @font-face {
          font-family: ${fontFamily.fontName};
          font-style: normal;
          font-weight: ${weigth};
          font-display: optional;
          src: url(${fontsBasePath}/${fontFamily.fontName}/poppins-latin-${weigth}.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }`;
  });
  return fontFaces.join('');
};

/**
 *
 * @param fontFamily font family to create the inject css code
 * @returns the complete code to use in a css
 */
export const injectFontFamily = (fontFamily: FontConfiguration): string => {
  switch (fontFamily.fontName) {
    case 'Poppins': {
      return parseFontConfiguration(fontFamily);
    }
  }
};

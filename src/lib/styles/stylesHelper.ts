/**
 * @constant
 */

const size = {
  xs: '480px',
  sm: '768px',
  md: '1024px',
  lg: '1200px',
  xl: '1700px',
};

/**
 * @param {{
 * sm: string,
 * md: string,
 * lg: string,
 * xl: string
 * }} size
 */

export const device = (Object.keys(size) as Array<keyof typeof size>).reduce((acc, key) => {
  acc[key] = (style: string) => `@media (min-width: ${size[key]}) { ${style} }`;
  return acc;
}, {} as { [index: string]: Function });

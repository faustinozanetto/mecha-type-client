/**
 * @param color: Input color to convert;
 * @returns the converted HEX color if successful.
 */
const convertHexToRGB = (color: string): [number, number, number] => {
  const hexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const full = color.replace(hexRegex, (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
  const values = /?#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);
  // Unsupported color
  if (!values) {
    throw new Error(`Mecha Type: Unsupported ${color} color.`);
  }

  return [Number.parseInt(values[1], 16), Number.parseInt(values[2], 16), Number.parseInt(values[3], 16)];
};

/**
 *
 * @param color : Input color to convert;
 * @returns the converted color to RGB.
 */
export const colorToRGB = (color: string) => {
  // If HEX detected convert it and return it.
  if (color.charAt(0) === '#') return convertHexToRGB(color);

  const safeColor = color.replace(/ /g, '');
  const colorType = color.substr(0, 4);
};

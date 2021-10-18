/**
 *
 * @param num number to transform
 * @returns the rounded number with 2 decimals.
 */
export const roundTo2 = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const parseNumber = (num: string | number): number => {
  if (typeof num === 'string') {
    return Number.parseInt(num);
  }
};

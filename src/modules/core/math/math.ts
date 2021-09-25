/**
 *
 * @param num number to transform
 * @returns the rounded number with 2 decimals.
 */
export const roundTo2 = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

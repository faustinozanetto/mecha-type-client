import { roundTo2 } from '../math';

test('It should return a rounded number with 2 decimals', () => {
  const inputNumber = 45.5846642;
  const roundedNumber = roundTo2(inputNumber);

  expect(roundedNumber).toBe(45.58);
});

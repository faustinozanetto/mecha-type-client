import { capitalizeFirstLetter, getLastChar, roundedToFixed } from '../helperFunctions';

test('It should return the last char of a given word', () => {
  const lastChar = getLastChar('Typescript');
  expect(lastChar).toBe('t');
});

test('It should capitalize the first letter of a given word', () => {
  const capitalizedWord = capitalizeFirstLetter('mongoose');

  expect(capitalizedWord).toBe('Mongoose');
});

test('It should convert a float to a fixed one with 2 digits', () => {
  const number1 = roundedToFixed(45.54565, 2);
  expect(number1).toBe(45.55);

  const number2 = roundedToFixed(5.6536, 3);
  expect(number2).toBe(5.654);
});

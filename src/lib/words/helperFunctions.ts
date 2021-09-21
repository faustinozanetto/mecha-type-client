import { TestPresetFragment } from 'generated/graphql';
import { words } from './wordList';

/**
 *
 * @param word input word.
 * @returns the last char, if found, of the given word.
 */
export const getLastChar = (word: string): string => {
  if (word) {
    return word.charAt(word.length - 1);
  }
  return '';
};

/**
 *
 * @param str input string
 * @returns the same string with the first letter to upper case.
 */
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 *
 * @param float : input float to transform;
 * @param digits amount of digits
 * @returns the input float to fixed.
 */
export const roundedToFixed = (float: number, digits: number): number => {
  const rounded = Math.pow(10, digits);
  return Number((Math.round(float * rounded) / rounded).toFixed(digits));
};

/**
 *
 * @param previousWord previous word
 * @param currentWord current word
 * @param index index
 * @param maxIndex maxIndex
 * @returns the punctuated word
 */
export const punctuateWord = (previousWord: string, currentWord: string, index: number, maxIndex: number): string => {
  // Storing temp word.
  let word = currentWord;

  if (
    index === 0 ||
    getLastChar(previousWord) === '.' ||
    getLastChar(previousWord) === '?' ||
    getLastChar(previousWord) === '!'
  ) {
    // Capitalize first letter of the word if there was a dot in the previous word.
    word = capitalizeFirstLetter(word);
  } else if (
    (Math.random() < 0.1 && getLastChar(previousWord) !== '.' && index !== maxIndex - 2) ||
    index === maxIndex - 1
  ) {
    // 10% chance to end a sentence.
    const rand = Math.random();
    if (rand <= 0.8) {
      word += '.';
    } else if (rand > 0.8 && rand < 0.9) {
      word += '?';
    } else {
      word += '!';
    }
  } else if (Math.random() < 0.01 && getLastChar(previousWord) !== ',' && getLastChar(previousWord) !== '.') {
    // 1% chance to add quotes
    word = `"${word}"`;
  } else if (Math.random() < 0.01) {
    // 1% chance to add a colon
    word += ':';
  } else if (
    // eslint-disable-next-line no-dupe-else-if
    Math.random() < 0.01 &&
    getLastChar(previousWord) !== ',' &&
    getLastChar(previousWord) !== '.' &&
    previousWord !== '-'
  ) {
    // 1% chance to add a dash
    word = '-';
  } else if (Math.random() < 0.2 && getLastChar(previousWord) !== ',') {
    // 2% chance to add a coma
    word += ',';
  }
  return word;
};

export const generateWords = (presetData: TestPresetFragment): string => {
  let text = '';
  const wordsList: string[] = [];

  // TODO: add support for selecting language.
  const language = words.filter((word) => word.language === presetData?.language?.toLowerCase())[0];

  // Practice mode -> WORDS OR TIME
  // let wordsBound = config.mode == 'time' ? 60 : config.words;

  // Generating random word list from words file.
  for (let i = 0; i < presetData?.words!; i++) {
    // Generating random word.
    let randomWord = language.words[Math.floor(Math.random() * language.words.length)];
    // Getting previous word
    const previousWord = wordsList[i - 1];
    // TODO: add support for customizing punctuation mode.
    const punctuation = false;
    // eslint-disable-next-line no-unmodified-loop-condition
    while (randomWord === previousWord || (!punctuation && randomWord === 'I') || randomWord.indexOf(' ') > -1) {
      randomWord = language.words[Math.floor(Math.random() * language.words.length)];
    }
    // Punctuate word if enabled
    if (punctuation) {
      randomWord = punctuateWord(previousWord, randomWord, i, presetData?.words!);
    }
    wordsList.push(randomWord);
    // Adding it to the words list.
    text = text.concat(`${randomWord} `);
  }
  return text;
};

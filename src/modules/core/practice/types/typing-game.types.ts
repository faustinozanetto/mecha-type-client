/**
 * Enum that describes the type of typing game,
 * wether it uses a input field for the words
 * or its in text.
 */
export enum TypingGameType {
  'INPUT',
  'TEXT',
}

export type WordBankEntry = {
  /** Language of the word list */
  language: string;
  /** Wether sentences are written from left to write or not */
  leftToRight: boolean;
  /** Words list */
  words: string[];
};

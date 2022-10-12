import {useEffect, useState} from "react";

const useGenerateText = (wordSet: string[], words: number = 50) => {
  const [generatedText, setGeneratedText] = useState<string>("");

  const constructText = (): string => {
    let text: string = "";
    const generatedWords: string[] = [];
    // Generating random word list from words file.
    for (let i = 0; i < words; i++) {
      // Generating random word.
      let randomWord: string = wordSet[Math.floor(Math.random() * wordSet.length)] || '';
      // Getting previous word
      const previousWord = generatedWords[i - 1];
      // TODO: add support for customizing punctuation mode.
      // eslint-disable-next-line no-unmodified-loop-condition
      while (
        randomWord === previousWord ||
        (randomWord === 'I') ||
        randomWord.indexOf(' ') > -1
        ) {
        randomWord = wordSet[Math.floor(Math.random() * wordSet.length)] || '';
      }
      generatedWords.push(randomWord);
      // Adding it to the words list.
      text = text.concat(`${randomWord} `);
    }
    return text;
  }

  const regenerateText = () => setGeneratedText(constructText());

  useEffect(() => {
    setGeneratedText(constructText());
  }, [])

  return {
    generatedText,
    regenerateText
  }
}

export default useGenerateText;
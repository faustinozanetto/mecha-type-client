import wordSet from '@data/wordset.json';
import useGenerateText from '@modules/game/hooks/use-generate-text';
import React, { useEffect, useRef } from 'react';

import TypingInput from './typing-input';

const TypingGame: React.FC = () => {
  const { generatedText } = useGenerateText(wordSet.words, 40);

  // const createTestEntry = trpc.typingTestEntries.create.useMutation();

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'tab') {
        buttonRef.current.focus();
      } else if (event.key !== 'Enter') {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /*
  const handleTestFinished = async (
    typingTestEntry: Omit<TypingTestEntry, 'createdAt' | 'updatedAt' | 'userId' | 'id'>
  ) => {

    await createTestEntry.mutateAsync({
      ...typingTestEntry,
      userId: 'cl8tlf6su0000ie8gq5otkk0m',
    });

  }; */

  return <TypingInput ref={inputRef} text={generatedText} time={20} onFinished={() => {}} />;
};

export default TypingGame;

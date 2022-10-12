import wordSet from '@data/wordset.json';
import useGenerateText from '@modules/game/hooks/use-generate-text';
import type { TypingTestEntry } from '@prisma/client';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

import TypingInput from './typing-input';

const TypingResults = dynamic(() => import('./results/typing-results'));

const TypingGame: React.FC = () => {
  const { generatedText } = useGenerateText(wordSet.words, 200);
  const [finishedGame, setFinishedGame] = useState<boolean>(false);
  const [finishedResults, setFinishedResults] = useState<TypingTestEntry>({} as TypingTestEntry);
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

  const handleTestFinished = async (
    typingTestEntry: Omit<TypingTestEntry, 'createdAt' | 'updatedAt' | 'userId' | 'id'>
  ) => {
    setFinishedGame(true);
    setFinishedResults((prev) => Object.assign(prev, { ...typingTestEntry }));
  };

  return (
    <>
      <TypingInput ref={inputRef} text={generatedText} time={20} onFinished={handleTestFinished} />
      {finishedGame && <TypingResults results={finishedResults} />}
    </>
  );
};

export default TypingGame;

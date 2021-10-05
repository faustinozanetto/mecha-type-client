import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTimer } from '@hooks/timer/useTimer';
import { useTypingGame } from '@hooks/typing/reducer/TypeReducer';
import { TestPresetFragment, UserFragment, useUpdateUserMutation } from '@generated/graphql';
import { Flex, SkeletonText, useColorModeValue, useToast, Box } from '@chakra-ui/react';
import { PracticeTestDetails } from '@components/practice/game/practice-test-details';
import { roundTo2 } from '@modules/core/math/math';
import { Caret } from '@components/practice/caret';
import { useSound } from '@modules/core/sound/use-sound-hook';
import { SoundType } from '@modules/core/sound/types/sound.types';
import { selectRandomTypeSound } from '@modules/core/sound/sounds-manager';
import useMechaStore from 'state/store';

const PracticeVisualLetter = dynamic(() => import('@components/practice/game/visual/practice-visual-letter'));
const PracticeResults = dynamic(() => import('@components/practice/results/practice-results'));

export enum ETypingStatType {
  ERRORS = 'Errors',
  CORRECT = 'Corrects',
  WPM = 'WPM',
  CPM = 'CPM',
  ACCURACY = 'Accuracy',
  KEYSTROKES = 'Keystrokes',
}

export interface ITypingStat {
  /**
   * Amount of errors
   */
  errors: number;
  /**
   * Amount of correct chars.
   */
  correct: number;
  /**
   * Words per minute.
   */
  wpm: number;
  /**
   * Characters per minute
   */
  cpm: number;
  /**
   * Typing accuracy
   */
  accuracy: number;
  /**
   * Keystrokes
   */
  keystrokes: number;
  /**
   * Second timestamp at which the stats where taken.
   */
  time: number;
}

interface PracticeGameInputProps {
  loading: boolean;
  /** Preset to take data from */
  testPreset: TestPresetFragment;
  /** Previously generated text */
  text: string;
  /** Current logged in user. */
  user: UserFragment;
}

export const PracticeGameInput: React.FC<PracticeGameInputProps> = ({ loading, testPreset, text, user }) => {
  const [duration, setDuration] = useState(0);
  const [typedWrong, setTypeWrong] = useState(false);
  const [stats, setStats] = useState<ITypingStat[]>([]);
  const { time, start, pause, reset } = useTimer();
  const [updateUserData] = useUpdateUserMutation();
  const [typingInput, setTypingInput] = useState('');
  const [currWordPos, setCurrWordPos] = useState([-1, -1]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const letterElements = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const [typeSound, setTypeSound] = useState<SoundType>(selectRandomTypeSound());
  const [play] = useSound(typeSound?.filePath, { volume: typeSound?.volume, id: 'type-sound' });

  const bgColor = useColorModeValue('gray.300', 'gray.900');
  const practiceConfig = useMechaStore((state) => state.practiceConfig);

  const {
    states: { charsState, currIndex, phase, correctChar, errorChar, spaceChar, keystrokes, startTime, endTime },
    actions: { insertTyping, deleteTyping, resetTyping },
  } = useTypingGame(text, {
    skipCurrentWordOnSpace: false,
    pauseOnError: practiceConfig.pauseOnError,
  });

  // Caret cursor positioning
  const pos = useMemo(() => {
    if (currIndex !== -1 && letterElements.current) {
      let spanRef: any = letterElements.current.children[currIndex];
      let left = spanRef.offsetLeft + spanRef.offsetWidth - 1;
      let top = spanRef.offsetTop + 4;
      return { left, top };
    } else {
      return {
        left: -2,
        top: 2,
      };
    }
  }, [currIndex]);

  // Use a random type sound on every key press
  useEffect(() => {
    setTypeSound(selectRandomTypeSound());
  }, [currIndex]);

  // Checks whether the word is correct while the user is typing
  useEffect(() => {
    setTypeWrong((prev: boolean): boolean => {
      let hasError = false;
      for (let i = 0; i < typingInput.length; i++) {
        const char = typingInput[i];
        const correctChar = text[currWordPos[0] + i];
        const diff = char !== correctChar;
        if (diff) {
          hasError = true;
          break;
        }
      }
      if (hasError !== prev) {
        return !prev;
      } else {
        return prev;
      }
    });
  }, [typingInput, currWordPos, text]);

  // Set the start and end index of the next word
  useEffect(() => {
    const tempCurrIndex = text[currIndex] === ' ' ? currIndex + 1 : currIndex;
    let startIndex = text.lastIndexOf(' ', tempCurrIndex);
    startIndex = startIndex < 0 ? 0 : startIndex + 1;
    let endIndex = text.indexOf(' ', tempCurrIndex);
    endIndex = endIndex < 0 ? text.length - 1 : endIndex - 1;

    setCurrWordPos((oldCurrWordPos) => {
      if (startIndex !== oldCurrWordPos[0] || endIndex !== oldCurrWordPos[1]) {
        return [startIndex, endIndex];
      }
      return oldCurrWordPos;
    });
  }, [currIndex, text]);

  // Submit inputted word
  const submitWord = () => {
    for (let i = currWordPos[0]; i <= currWordPos[1]; i++) {
      const index = i - currIndex - 1;
      if (index > typingInput.length - 1) {
        insertTyping();
      } else {
        insertTyping(typingInput[index]);
      }
    }
    insertTyping(' ');
    setTypingInput('');
    setTypeWrong(false);
  };

  /**
   * Updates the user data with the new test results
   */
  const updateUser = () => {
    if (user) {
      if (!user.id || phase !== 2 || !endTime || !startTime) {
        toast({
          title: 'Something went wrong!',
          status: 'error',
          position: 'bottom-right',
        });
      } else {
        updateUserData({
          variables: {
            where: {
              id: user.id,
            },
            data: {
              keystrokes: { increment: keystrokes },
              wordsWritten: { set: 0 },
              testsCompleted: { increment: 1 },
              wordsPerMinute: {
                createdAt: new Date(),
                amount: roundTo2((correctChar * (60 / time)) / 5) ?? 0,
              },
              charsPerMinute: {
                createdAt: new Date(),
                amount: Math.round((60 / time) * correctChar) ?? 0,
              },
              accuracy: {
                createdAt: new Date(),
                amount: roundTo2((correctChar / (correctChar + errorChar)) * 100 ?? 0),
              },
            },
          },
        });
      }
    }
  };

  useEffect(() => {
    switch (phase) {
      case 0: {
        // Reset timer
        reset();
        break;
      }
      case 1: {
        // Start timer
        start();
        break;
      }
      case 2: {
        // Pause timer
        pause();
        // Update user data to database.
        updateUser();
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase === 2 && endTime && startTime) {
      setDuration(Math.floor((endTime - startTime) / 1000));
      setCurrWordPos([-1, -1]);
    } else {
      setDuration(0);
    }
  }, [phase, startTime, endTime]);

  // Effect called when test time updates to store the stats each second.
  useEffect(() => {
    // Creating a stat entry with the current settings.
    if (time !== 0) {
      const statEntry: ITypingStat = {
        time: time,
        correct: correctChar,
        errors: errorChar,
        wpm: roundTo2((correctChar * (60 / time)) / 5),
        cpm: Math.round((60 / time) * correctChar),
        accuracy: (correctChar / (correctChar + errorChar)) * 100,
        keystrokes: keystrokes,
      };
      setStats([...stats, statEntry]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const handleKeyDown = (letter: string, control: boolean) => {
    if (phase !== 2) {
      if (letter === 'Escape') {
        resetTyping();
      } else if (letter === 'Backspace' && !practiceConfig.noBackspace) {
        deleteTyping(control);
        if (practiceConfig.typeSounds) {
          play();
        }
      } else if (letter.length === 1) {
        insertTyping(letter);
        if (practiceConfig.typeSounds) {
          play();
        }
      }
    }
  };

  return (
    <Flex flexDir="column">
      {/* Top container */}
      <PracticeTestDetails loading={loading} practiceTest={testPreset} time={time} />
      <Flex
        flexDir="column"
        padding={6}
        borderRadius="2xl"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="xl"
        marginBottom={4}
        fontSize="lg"
        backgroundColor={bgColor}
        tabIndex={0}
        userSelect="none"
        outline="none"
        onKeyDown={(e) => handleKeyDown(e.key, e.ctrlKey)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <SkeletonText isLoaded={!loading} noOfLines={4}>
          {/* Words container */}
          <Box display="block" mb={2} ref={letterElements} transition="all 0.25s ease 0s" blur="4px">
            {text.split('').map((letter, index) => {
              const state = charsState[index];
              const shouldHighlight = index >= currWordPos[0] && index <= currWordPos[1];
              return (
                <PracticeVisualLetter
                  key={letter + index}
                  shouldShowErrors={!practiceConfig.blindMode}
                  correct={state === 1}
                  incorrect={state === 2}
                  highlight={false}
                >
                  {letter}
                </PracticeVisualLetter>
              );
            })}
          </Box>
        </SkeletonText>

        {/* Show input filed if typing game is of type input
        {writeInputType === TypingGameType.INPUT && (
          <Box width="100%" mt={2}>
            <Input
              type="text"
              ref={inputRef}
              variant="flushed"
              fontWeight={500}
              fontSize="lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  submitWord();
                }
              }}
              onChange={(e) => {
                setTypingInput(e.target.value);
              }}
              focusBorderColor={!typingInput.length ? '#94A3B8' : typedWrong ? 'red' : 'green'}
              borderColor={!typingInput.length ? '#94A3B8' : typedWrong ? 'red' : 'green'}
              borderBottomWidth={2}
              value={typingInput}
              disabled={phase === 2}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder={phase !== 1 ? 'Type here... (Press enter or space to submit word)' : ''}
            />
          </Box>
        )} */}
      </Flex>

      {/* Caret */}
      {phase !== 2 && currIndex >= 0 && <Caret style={{ left: pos.left, top: pos.top }}>&nbsp;</Caret>}

      {/* Stats container */}
      {phase === 2 && startTime && endTime && (
        <PracticeResults
          showStats={phase === 2 && startTime !== 0 && endTime !== 0}
          keystrokes={keystrokes}
          wordsPerMinute={roundTo2((correctChar * (60 / time)) / 5)}
          charsPerMinute={Math.round((60 / time) * correctChar)}
          correctChars={correctChar}
          incorrectChars={errorChar}
          spaceChars={spaceChar}
          accuracy={`${((correctChar / (correctChar + errorChar)) * 100).toFixed(2)}%`}
          wordsWritten={0}
          duration={`${time}s`}
          statsData={stats}
        />
      )}
    </Flex>
  );
};

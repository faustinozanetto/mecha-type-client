import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTimer } from '@hooks/timer/useTimer';
import { useTypingGame } from '@hooks/typing/reducer/TypeReducer';
import {
  TestPresetFragment,
  UserFragment,
  UserSettingsFragment,
  useUserCreateTestPresetHistoryEntryMutation,
  useUserSettingsQuery,
} from '@generated/graphql';
import { Flex, SkeletonText, useColorModeValue, useToast, Box } from '@chakra-ui/react';
import { roundTo2 } from '@modules/core/math/math';
import { Caret } from '@components/practice/caret';
import { useSound } from '@modules/core/sound/use-sound-hook';
import { SoundType } from '@modules/core/sound/types/sound.types';
import { selectRandomTypeSound } from '@modules/core/sound/sounds-manager';
import PracticeVisualLetter from '../visual/practice-visual-letter';
import PracticeResults from '@components/practice/results/practice-results';

export enum ETypingStatType {
  CHARS = 'Characters',
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
  time: number | Date;
}

interface PracticeGameInputProps {
  loading: boolean;
  /** Preset to take data from */
  testPreset: TestPresetFragment;
  /** Previously generated text */
  text: string;
  /** Current logged in user. */
  user: UserFragment;
  userSettings: UserSettingsFragment;
}

export const PracticeGameInput: React.FC<PracticeGameInputProps> = ({
  loading,
  testPreset,
  text,
  user,
  userSettings,
}) => {
  const [duration, setDuration] = useState(0);
  const [stats, setStats] = useState<ITypingStat[]>([]);
  const { time, start, pause, reset } = useTimer();
  const [userCreateTestPresetHistoryEntry] = useUserCreateTestPresetHistoryEntryMutation();
  const [currWordPos, setCurrWordPos] = useState([-1, -1]);
  const [isFocused, setIsFocused] = useState(false);
  const letterElements = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const [typeSound, setTypeSound] = useState<SoundType>(selectRandomTypeSound());
  const [play] = useSound(typeSound?.filePath, { volume: typeSound?.volume, id: 'type-sound' });

  const bgColor = useColorModeValue('gray.300', 'gray.900');

  const {
    states: { charsState, currIndex, phase, correctChar, errorChar, spaceChar, keystrokes, startTime, endTime },
    actions: { insertTyping, deleteTyping, resetTyping },
  } = useTypingGame(text, {
    skipCurrentWordOnSpace: false,
    pauseOnError: userSettings.pauseOnError,
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
        userCreateTestPresetHistoryEntry({
          variables: {
            userId: user.id,
            input: {
              userId: user.id,
              testPresetId: testPreset.id,
              wpm: roundTo2((correctChar * (60 / time)) / 5) ?? 0,
              cpm: Math.round((60 / time) * correctChar) ?? 0,
              accuracy: roundTo2((correctChar / (correctChar + errorChar)) * 100 ?? 0),
              keystrokes,
              correctChars: correctChar,
              incorrectChars: errorChar,
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
      } else if (letter === 'Backspace' && !userSettings.noBackspace) {
        deleteTyping(control);
        if (userSettings.typeSounds) {
          play();
        }
      } else if (letter.length === 1) {
        insertTyping(letter);
        if (userSettings.typeSounds) {
          play();
        }
      }
    }
  };

  return (
    <Flex flexDir="column">
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
                  shouldShowErrors={!userSettings.blindMode}
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
      </Flex>

      {/* Caret */}
      {phase !== 2 && isFocused && currIndex >= 0 && <Caret style={{ left: pos.left, top: pos.top }}>&nbsp;</Caret>}

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

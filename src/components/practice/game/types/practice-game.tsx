import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTimer } from '@hooks/timer/useTimer';
import { useTypingGame } from '@hooks/typing/reducer/TypeReducer';
import {
  TestPresetFragment,
  UserFragment,
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
import { PracticeStatsEntry } from '@typings/practice.types';
import { generateWords } from '@modules/core/practice/typing-game-utils';
import useAuth from '@contexts/UserContext';

interface PracticeGameInputProps {
  loading: boolean;
  /** Preset to take data from */
  testPreset: TestPresetFragment;
}

export const PracticeGameInput: React.FC<PracticeGameInputProps> = ({ loading, testPreset }) => {
  const letterElements = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const { user } = useAuth();
  const [userCreateTestPresetHistoryEntry] = useUserCreateTestPresetHistoryEntryMutation();
  const [stats, setStats] = useState<PracticeStatsEntry[]>([]);
  const { time, start, pause, reset } = useTimer();
  const [currWordPos, setCurrWordPos] = useState([-1, -1]);
  const [isFocused, setIsFocused] = useState(false);
  const [typeSound, setTypeSound] = useState<SoundType>(selectRandomTypeSound());
  const [play] = useSound(typeSound?.filePath, { volume: typeSound?.volume, id: 'type-sound' });
  const { data: userSettings, loading: userSettingsLoading } = useUserSettingsQuery({
    ssr: true,
    skip: user === null,
    variables: { input: { userId: user?.id } },
  });
  const bgColor = useColorModeValue('gray.300', 'gray.900');

  const {
    states: { chars, charsState, currIndex, phase, correctChar, errorChar, spaceChar, keystrokes, startTime, endTime },
    actions: { insertTyping, deleteTyping, resetTyping },
  } = useTypingGame(generateWords(testPreset).trimEnd(), {
    skipCurrentWordOnSpace: false,
    pauseOnError: userSettings?.userSettings?.userSettings?.pauseOnError,
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
    if (user && user.id) {
      if (phase !== 2 || !endTime || !startTime) {
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
    } else {
      toast({
        title: 'Warning',
        description: 'Log-in to save your progress!',
        status: 'warning',
        position: 'bottom-right',
      });
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
      setCurrWordPos([-1, -1]);
    }
  }, [phase, startTime, endTime]);

  // Effect called when test time updates to store the stats each second.
  useEffect(() => {
    // Creating a stat entry with the current settings.
    if (time !== 0) {
      const statEntry: PracticeStatsEntry = {
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
      } else if (letter === 'Backspace' && !userSettings?.userSettings?.userSettings?.noBackspace) {
        deleteTyping(control);
        if (userSettings?.userSettings?.userSettings?.typeSounds) {
          play();
        }
      } else if (letter.length === 1) {
        insertTyping(letter);
        if (userSettings?.userSettings?.userSettings?.typeSounds) {
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
            {chars.split('').map((letter, index) => {
              const state = charsState[index];
              const shouldHighlight = index >= currWordPos[0] && index <= currWordPos[1];
              return (
                <PracticeVisualLetter
                  key={letter + index}
                  shouldShowErrors={!userSettings?.userSettings?.userSettings?.blindMode}
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
          wordsWritten={chars.split(' ').length}
          duration={`${time}s`}
          statsData={stats}
        />
      )}
    </Flex>
  );
};

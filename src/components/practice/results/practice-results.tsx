import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { BiTime } from 'react-icons/bi';
import { BiBullseye } from 'react-icons/bi';
import { FaKeyboard } from 'react-icons/fa';
import { ITypingStat, ETypingStatType } from '../game/types/practice-game-input';
import { ChartSelectButton, StatLineChart } from './charts';
import { UserStatCard } from '@components/user/stats/user-stat-card';
import { Flex, Text, SimpleGrid, Button, Box, useColorModeValue } from '@chakra-ui/react';

interface PracticeResultsProps {
  showStats?: boolean;
  keystrokes?: number;
  wordsPerMinute?: number;
  charsPerMinute?: number;
  correctChars?: number;
  incorrectChars?: number;
  spaceChars?: number;
  accuracy?: string;
  wordsWritten?: number;
  duration?: string;
  statsData: ITypingStat[];
}

export const PracticeResults: React.FC<PracticeResultsProps> = ({
  showStats = false,
  keystrokes = 0,
  wordsPerMinute = 0,
  charsPerMinute = 0,
  correctChars = 0,
  incorrectChars = 0,
  spaceChars = 0,
  accuracy = '0%',
  wordsWritten = 0,
  duration = '0s',
  statsData,
}) => {
  const router = useRouter();
  const [currentGraph, setCurrentGraph] = useState<ETypingStatType>(ETypingStatType.WPM);

  return (
    <Flex
      flexDir="column"
      borderRadius="2xl"
      padding="1.5rem"
      backgroundColor={useColorModeValue('gray.300', 'gray.900')}
    >
      <Box>
        <Flex flexDir="row" alignItems="center" justifyContent="space-between" marginBottom="1.5rem">
          <Text as="h1" fontSize="3xl" color={useColorModeValue('black', 'white')} fontWeight={700}>
            Results
          </Text>
          <Button
            size="lg"
            variant="solid"
            boxShadow="xl"
            margin="0"
            colorScheme="purple"
            onClick={() => {
              router.push('/practice');
            }}
          >
            Back
          </Button>
        </Flex>
        <SimpleGrid columns={[1, 1, 2, 3, 3]} spacing="0.5rem">
          <UserStatCard title="Keystrokes" amount={keystrokes.toString()} icon={FaKeyboard} backgroundColor="#075985" />
          <UserStatCard title="WPM" amount={wordsPerMinute.toString()} icon={FaKeyboard} backgroundColor="#1E40AF" />
          <UserStatCard title="CPM" amount={charsPerMinute.toString()} icon={FaKeyboard} backgroundColor="#3730A3" />
          <UserStatCard title="Accuracy" amount={accuracy} icon={BiBullseye} backgroundColor="#5B21B6" />
          <UserStatCard
            title="Words Written"
            amount={wordsWritten.toString()}
            icon={BiBullseye}
            backgroundColor="#6B21A8"
          />
          <UserStatCard title="Duration" amount={duration} icon={BiTime} backgroundColor="#86198F" />
        </SimpleGrid>
      </Box>
      <Box>
        <Flex flexDir="row" alignItems="center" justifyContent="space-between" marginTop="1.5rem" marginBottom="1.5rem">
          <Text as="h1" fontSize="3xl" color={useColorModeValue('black', 'white')} fontWeight={700}>
            Charts
          </Text>
          <Flex flexDir="row" justifyContent="space-between">
            <ChartSelectButton label={ETypingStatType.WPM} onClick={() => setCurrentGraph(ETypingStatType.WPM)} />
            <ChartSelectButton label={ETypingStatType.CPM} onClick={() => setCurrentGraph(ETypingStatType.CPM)} />
            <ChartSelectButton
              label={ETypingStatType.ACCURACY}
              onClick={() => setCurrentGraph(ETypingStatType.ACCURACY)}
            />
            <ChartSelectButton label={ETypingStatType.ERRORS} onClick={() => setCurrentGraph(ETypingStatType.ERRORS)} />
            <ChartSelectButton
              label={ETypingStatType.CORRECT}
              onClick={() => setCurrentGraph(ETypingStatType.CORRECT)}
            />
          </Flex>
        </Flex>
        <SimpleGrid columns={1} rows={1} spacing="0.5rem">
          <StatLineChart statsData={statsData} statType={currentGraph} />
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

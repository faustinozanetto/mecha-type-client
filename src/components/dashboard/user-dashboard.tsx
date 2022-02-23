import React, { useState, useEffect } from 'react';
import { UserFragment } from 'generated/graphql';
import { Flex, Text, Heading, useColorModeValue, SimpleGrid, GridItem } from '@chakra-ui/react';
import { StatLineChart } from '@components/practice/results/charts';
import { StatDonutChart } from '@components/practice/results/charts/stat-donut-chart';
import { PracticeStatType, PracticeStatsEntry } from '@typings/practice.types';

interface DashboardProps {
  /**
   * UserFragment to retrieve data from.
   */
  user: UserFragment;
}

export const UserDashboard: React.FC<DashboardProps> = ({ user }) => {
  const [parsedStats, setParsedStats] = useState<PracticeStatsEntry[]>([]);
  const bgColor = useColorModeValue('gray.300', 'gray.900');
  const chartBgColor = useColorModeValue('gray.200', 'gray.800');

  const parseStats = (): PracticeStatsEntry[] => {
    let data: PracticeStatsEntry[] = [];
    if (user && user.testPresetHistory) {
      for (let i = 0; i < user.testPresetHistory.length; i++) {
        const wpm = user.testPresetHistory[i].wpm;
        const cpm = user.testPresetHistory[i].cpm;
        const accuracy = user.testPresetHistory[i].accuracy;
        const keystrokes = user.testPresetHistory[i].keystrokes;
        const correctChars = user.testPresetHistory[i].correctChars;
        const incorrectChars = user.testPresetHistory[i].incorrectChars;

        data.push({
          wpm: wpm ?? 0,
          cpm: cpm ?? 0,
          accuracy: accuracy ?? 0,
          correct: correctChars ?? 0,
          errors: incorrectChars ?? 0,
          keystrokes: keystrokes ?? 0,
          time: user.testPresetHistory[i].createdAt,
        });
      }
    }
    return data;
  };

  useEffect(() => {
    setParsedStats(parseStats());
  }, [user, user?.testPresetHistory]);

  return (
    <Flex flexDir="column" width="full" py={8}>
      {/* Heading */}
      <Flex flexDir="column" backgroundColor={bgColor} rounded="lg" padding={6} my={4}>
        <Heading as="h1">Welcome back, {user?.username}.</Heading>
        <Text as="h2" ml={2} fontSize="lg" fontWeight={500}>
          You have improved a lot since last week!
        </Text>
      </Flex>

      {/* Charts */}
      {parsedStats && parsedStats.length > 1 && (
        <Flex flexDir="column" backgroundColor={bgColor} rounded="lg" padding={6} my={4}>
          <SimpleGrid gap={2}>
            <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
              <StatLineChart statsData={parsedStats} statType={PracticeStatType.ACCURACY} />
            </GridItem>
            <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
              <StatLineChart statsData={parsedStats} statType={PracticeStatType.WPM} />
            </GridItem>
            <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
              <StatLineChart statsData={parsedStats} statType={PracticeStatType.CPM} />
            </GridItem>
            <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
              <StatDonutChart statsData={parsedStats} statType={PracticeStatType.CHARS} />
            </GridItem>
          </SimpleGrid>
        </Flex>
      )}
      {parsedStats && parsedStats.length <= 1 && (
        <Flex
          flexDir="column"
          rounded="lg"
          alignContent="center"
          alignItems="center"
          backgroundColor={bgColor}
          m={4}
          p={4}
        >
          <Text as="h2" fontWeight={600} fontSize="xl">
            Not enough data, try practicing more!
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

import React, { useState, useEffect } from 'react';
import { UserFragment } from 'generated/graphql';
import { Flex, Text, Heading, useColorModeValue, SimpleGrid, VStack, GridItem } from '@chakra-ui/react';
import { StatLineChart } from '@components/practice/results/charts';
import { ETypingStatType, ITypingStat } from '@components/practice/game/types/practice-game';
import { StatDonutChart } from '@components/practice/results/charts/stat-donut-chart';

interface DashboardProps {
  /**
   * UserFragment to retrieve data from.
   */
  user: UserFragment;
}

export const UserDashboard: React.FC<DashboardProps> = ({ user }) => {
  const [currentStat, setCurrentStat] = useState<ITypingStat[]>([]);
  const bgColor = useColorModeValue('gray.300', 'gray.900');
  const chartBgColor = useColorModeValue('gray.200', 'gray.800');

  const parseStats = (): ITypingStat[] => {
    let data: ITypingStat[] = [];
    if (user) {
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
    const parsedData = parseStats();
    setCurrentStat(parsedData);
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
      <Flex flexDir="column" backgroundColor={bgColor} rounded="lg" padding={6} my={4}>
        <SimpleGrid columns={[1, 1, 1, 1, 2, 2]} rows={2} gap={2}>
          <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
            <StatLineChart statsData={currentStat} statType={ETypingStatType.ACCURACY} />
          </GridItem>
          <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
            <StatLineChart statsData={currentStat} statType={ETypingStatType.WPM} />
          </GridItem>
          <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
            <StatLineChart statsData={currentStat} statType={ETypingStatType.CPM} />
          </GridItem>
          <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
            <StatDonutChart statsData={currentStat} statType={ETypingStatType.CHARS} />
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

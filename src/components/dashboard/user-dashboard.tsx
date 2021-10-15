import React, { useState, useEffect } from 'react';
import { UserFragment } from 'generated/graphql';
import { Flex, Text, Heading, useColorModeValue, SimpleGrid, VStack, GridItem } from '@chakra-ui/react';
import { StatLineChart } from '@components/practice/results/charts';
import { ETypingStatType, ITypingStat } from '@components/practice/game/types/practice-game';

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
      for (let i = 0; i < user.testsCompleted; i++) {
        const wpm = user.wordsPerMinute[i];
        const cpm = user.charsPerMinute[i];
        const accuracy = user.accuracy[i];
        const keystrokes = user.keystrokes;

        data.push({
          wpm: wpm.amount ?? 0,
          cpm: cpm.amount ?? 0,
          accuracy: accuracy.amount ?? 0,
          correct: 0,
          errors: 0,
          keystrokes: keystrokes ?? 0,
          time: wpm.createdAt,
        });
      }
    }
    console.log(user);
    return data;
  };

  useEffect(() => {
    const parsedData = parseStats();
    setCurrentStat(parsedData);
  }, [user, user?.testsCompleted]);

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
        <SimpleGrid columns={2} rows={3} gap={2}>
          <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
            <StatLineChart statsData={currentStat} statType={ETypingStatType.ACCURACY} />
          </GridItem>
          <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
            <StatLineChart statsData={currentStat} statType={ETypingStatType.WPM} />
          </GridItem>
          <GridItem backgroundColor={chartBgColor} rounded="lg" padding={6} margin={4}>
            <StatLineChart statsData={currentStat} statType={ETypingStatType.CPM} />
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

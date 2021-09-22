import React from 'react';

import { Flex } from '@chakra-ui/react';

interface StatCardProps {
  // statData: IPositionEntry;
}

// TODO: Continue working on dashboard stat card
export const StatCard: React.FC<StatCardProps> = ({}) => {
  // const parseFieldType = (filterBy: FilterBy) => {
  //   switch (filterBy) {
  //     case FilterBy.AverageWpm:
  //       return 'Average WPM';
  //     case FilterBy.Keystrokes:
  //       return 'Keystrokes';
  //     case FilterBy.TestsCompleted:
  //       return 'Tests Completed';
  //     case FilterBy.WordsWritten:
  //       return 'Words Written';
  //   }
  // };

  return <Flex flexDir="column" borderRadius="2rem" maxWidth="300px" overflow="hidden" m={4}></Flex>;
};

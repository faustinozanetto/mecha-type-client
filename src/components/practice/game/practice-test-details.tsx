import React from 'react';
import { Flex, useColorModeValue, Text, Skeleton, HStack, Switch } from '@chakra-ui/react';
import { TestPreset } from '@generated/graphql';

interface PracticeTestDetailsProps {
  /** Test preset data */
  practiceTest: TestPreset;
  /** Wether data is loading or not */
  loading: boolean;
}

export const PracticeTestDetails: React.FC<PracticeTestDetailsProps> = ({ loading, practiceTest }) => {
  const textColor = useColorModeValue('black', 'white');
  return (
    <Flex
      flexDir="row"
      padding="1rem"
      borderRadius="2xl"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="xl"
      marginBottom="1rem"
      backgroundColor={useColorModeValue('gray.300', 'gray.900')}
    >
      <Flex flexDir="column">
        <Skeleton isLoaded={!loading}>
          <Text as="h1" fontSize="2xl" color={useColorModeValue('black', 'white')} fontWeight={700}>
            Writing Test
          </Text>
        </Skeleton>

        <Skeleton isLoaded={!loading}>
          <Text as="h2" fontSize="xl" color={textColor} fontWeight={600}>
            {practiceTest?.words} words - {practiceTest?.language}
          </Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
};

import React from 'react';
import styled from 'styled-components';
import { TestPreset, TestType } from 'generated/graphql';
import { Button, Flex, Skeleton, Text } from '@chakra-ui/react';

interface UserPresetCardProps {
  /** Preset data to retrieve info from. */
  preset: TestPreset;
  /** Wether content is loading or not */
  loading: boolean;
}

export const UserPresetCard: React.FC<UserPresetCardProps> = ({ preset, loading }) => {
  return (
    <Flex
      flexDir="row"
      backgroundColor="#1a202c"
      alignContent="flex-start"
      justifyContent="flex-start"
      alignItems="center"
      margin={2}
      padding={4}
      borderRadius="lg"
      width={['auto', 'auto', 'auto', '100%', '100%']}
    >
      <Skeleton isLoaded={!loading} height="auto">
        <Text as="h3" color="white" fontWeight={600} fontSize="1.1rem">
          {preset.language} | {preset?.type} |{' '}
          {preset.type === TestType.Words ? `${preset.words} words` : `${preset.time} seconds`}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!loading} marginLeft={4} height="auto">
        <Button
          as="a"
          colorScheme="purple"
          borderRadius="md"
          size="lg"
          variant="solid"
          marginLeft={4}
          href={`/practice/play/${preset.id}`}
        >
          Try now
        </Button>
      </Skeleton>
    </Flex>
  );
};

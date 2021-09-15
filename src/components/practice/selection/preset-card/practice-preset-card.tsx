import React from 'react';
import styled from 'styled-components';

import { capitalizeFirstLetter } from '@lib/words/helperFunctions';
import { TestPreset, TestType } from 'generated/graphql';
import { Flex, Image, Box, Text, HStack, Button, useColorModeValue, Wrap, Badge } from '@chakra-ui/react';
// import Image from 'next/image';
import { PracticePresetCardStat } from './practice-preset-card-stat';

interface PracticePresetCardProps {
  /** Data to fill the card information */
  presetData: TestPreset;
}

export const PracticePresetCard: React.FC<PracticePresetCardProps> = ({ presetData }) => {
  const bgColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Flex flexDir="column" backgroundColor={bgColor} borderRadius="2rem" maxWidth="300px" overflow="hidden" m={4}>
      {/* Banner */}
      <Flex flexDir="row" justifyContent="center" alignItems="flex-end" height="6rem" backgroundColor="gray.600">
        <Flex
          width="8rem"
          height="8rem"
          borderRadius="50%"
          backgroundColor="#fff"
          boxShadow="0 0.5rem 1rem rgb(0 0 0 / 30%)"
          transform="translateY(50%)"
        >
          <Image src={presetData?.creatorImage!} alt="Created by" borderRadius="full" />
        </Flex>
      </Flex>
      {/* Badge */}
      <Flex position="relative" top="-80px" right="-245px">
        <Badge colorScheme="red" fontSize="0.85rem">
          Hot
        </Badge>
      </Flex>
      <Flex width="100%" height="4.5rem" padding={2}></Flex>
      {/* Name */}
      <HStack justify="center" padding="0 2rem 0.5rem">
        <Text as="span" fontSize="lg" fontWeight={600} textAlign="center" opacity="0.75" margin="0">
          by
        </Text>
        <Text as="h2" fontSize="2xl" fontWeight={600} textAlign="center" margin="0">
          Mecha Type
        </Text>
      </HStack>
      {/* Details */}
      <Flex flexDir="column" padding="0 2rem 1.2rem">
        {/* Top */}
        <Wrap spacing={4} justify="center">
          <PracticePresetCardStat text={presetData?.type?.toString()!} />
          <PracticePresetCardStat text={capitalizeFirstLetter(presetData?.language?.toLowerCase()!)} />
          {presetData?.type === TestType.Time && <PracticePresetCardStat text={`${presetData?.time}s`} />}
          {presetData?.type === TestType.Words && <PracticePresetCardStat text={`${presetData?.words} words`} />}
        </Wrap>
      </Flex>
      <HStack padding="0 2rem 0.75rem">
        <Button
          as="a"
          variant="solid"
          borderRadius="lg"
          colorScheme="telegram"
          size="lg"
          my={2}
          width="full"
          href={`/practice/play/${presetData.id}`}
        >
          Start
        </Button>
      </HStack>
    </Flex>
  );
};

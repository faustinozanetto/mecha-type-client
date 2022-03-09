import React from 'react';

import { TestContent, TestPresetFragment, TestType } from 'generated/graphql';
import { Flex, Image, Text, HStack, Button, useColorModeValue, Wrap } from '@chakra-ui/react';
// import Image from 'next/image';
import { PracticePresetCardStat } from './practice-preset-card-stat';
import { capitalizeFirstLetter } from '@modules/core/practice/typing-game-utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PracticePresetCardProps {
  /** Data to fill the card information */
  presetData: TestPresetFragment;
}

const PracticePresetCard: React.FC<PracticePresetCardProps> = ({ presetData }) => {
  const bgColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Flex flexDir="column" backgroundColor={bgColor} borderRadius="2rem" maxWidth="200px" overflow="hidden" m={4}>
      {/* Banner */}
      <Flex flexDir="row" justifyContent="center" alignItems="flex-end" height="3.5rem" backgroundColor="gray.600">
        <Flex
          width="5rem"
          height="5rem"
          borderRadius="50%"
          backgroundColor="#fff"
          boxShadow="0 0.5rem 1rem rgb(0 0 0 / 30%)"
          transform="translateY(50%)"
        >
          <Image src={presetData?.creatorImage!} alt="Created by" borderRadius="full" />
        </Flex>
      </Flex>
      {/* Badge
      <Flex position="relative" top="-60px" right="-200px">
        <Badge colorScheme="red" fontSize="0.85rem">
          Hot
        </Badge>
      </Flex> */}
      <Flex width="100%" height="3rem" padding={2}></Flex>
      {/* Name */}
      <HStack justify="center" padding="0 1rem 0.5rem">
        <Text as="span" fontSize="sm" fontWeight={600} textAlign="center" opacity="0.75" margin="0">
          by
        </Text>
        <Text as="h2" fontSize="md" fontWeight={600} textAlign="center" margin="0">
          Mecha Type
        </Text>
      </HStack>
      {/* Details */}
      <Flex flexDir="column" padding="0 1rem 0.5rem">
        {/* Top */}
        <Wrap spacing={2} justify="center">
          <PracticePresetCardStat>{presetData?.type}</PracticePresetCardStat>
          <PracticePresetCardStat>{capitalizeFirstLetter(presetData?.language?.toLowerCase())}</PracticePresetCardStat>
          {/* {presetData?.type === TestType.Time && (
            <PracticePresetCardStat>{`${presetData?.time}s`}</PracticePresetCardStat>
          )} */}
          {presetData?.type === TestType.Words && presetData.content === TestContent.Random && (
            <PracticePresetCardStat>{`${presetData?.words} words`}</PracticePresetCardStat>
          )}
          {presetData?.punctuated && <PracticePresetCardStat>Punctuated</PracticePresetCardStat>}
          {presetData?.content && <PracticePresetCardStat>{presetData.content}</PracticePresetCardStat>}
        </Wrap>
      </Flex>
      <HStack padding="0 0.75rem 0.75rem">
        <Link href={`/practice/play/${presetData.id}`} passHref>
          <Button variant="solid" borderRadius="lg" colorScheme="telegram" size="md" my={1} width="full">
            Start
          </Button>
        </Link>
      </HStack>
    </Flex>
  );
};
export default PracticePresetCard;

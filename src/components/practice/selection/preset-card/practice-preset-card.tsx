import React from 'react';

import { capitalizeFirstLetter } from '@lib/words/helperFunctions';
import { TestPresetFragment, TestType } from 'generated/graphql';
import { Flex, Image, Text, HStack, Button, useColorModeValue, Wrap } from '@chakra-ui/react';
// import Image from 'next/image';
import { PracticePresetCardStat } from './practice-preset-card-stat';

interface PracticePresetCardProps {
  /** Data to fill the card information */
  presetData: TestPresetFragment;
}

const PracticePresetCard: React.FC<PracticePresetCardProps> = ({ presetData }) => {
  const bgColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Flex flexDir="column" backgroundColor={bgColor} borderRadius="2rem" maxWidth="250px" overflow="hidden" m={4}>
      {/* Banner */}
      <Flex flexDir="row" justifyContent="center" alignItems="flex-end" height="5rem" backgroundColor="gray.600">
        <Flex
          width="6rem"
          height="6rem"
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
      <Flex width="100%" height="3.5rem" padding={2}></Flex>
      {/* Name */}
      <HStack justify="center" padding="0 1rem 0.5rem">
        <Text as="span" fontSize="md" fontWeight={600} textAlign="center" opacity="0.75" margin="0">
          by
        </Text>
        <Text as="h2" fontSize="xl" fontWeight={600} textAlign="center" margin="0">
          Mecha Type
        </Text>
      </HStack>
      {/* Details */}
      <Flex flexDir="column" padding="0 1rem 0.5rem">
        {/* Top */}
        <Wrap spacing={4} justify="center">
          <PracticePresetCardStat text={presetData?.type?.toString()!} />
          <PracticePresetCardStat text={capitalizeFirstLetter(presetData?.language?.toLowerCase()!)} />
          {presetData?.type === TestType.Time && <PracticePresetCardStat text={`${presetData?.time}s`} />}
          {presetData?.type === TestType.Words && <PracticePresetCardStat text={`${presetData?.words} words`} />}
        </Wrap>
      </Flex>
      <HStack padding="0 1rem 0.75rem">
        <Button
          as="a"
          variant="solid"
          borderRadius="lg"
          colorScheme="telegram"
          size="md"
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
export default PracticePresetCard;

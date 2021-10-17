import React from 'react';

import { TestPresetFragment, TestType } from 'generated/graphql';
import { Flex, Image, Text, HStack, Button, useColorModeValue, Wrap } from '@chakra-ui/react';
// import Image from 'next/image';
import { PracticePresetCardStat } from './practice-preset-card-stat';
import { capitalizeFirstLetter } from '@modules/core/practice/typing-game-utils';
import { motion } from 'framer-motion';

interface PracticePresetCardProps {
  /** Data to fill the card information */
  presetData: TestPresetFragment;
}

const PracticePresetCard: React.FC<PracticePresetCardProps> = ({ presetData }) => {
  const bgColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
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
            <PracticePresetCardStat text={presetData?.type?.toString()!} />
            <PracticePresetCardStat text={capitalizeFirstLetter(presetData?.language?.toLowerCase()!)} />
            {presetData?.type === TestType.Time && <PracticePresetCardStat text={`${presetData?.time}s`} />}
            {presetData?.type === TestType.Words && <PracticePresetCardStat text={`${presetData?.words} words`} />}
          </Wrap>
        </Flex>
        <HStack padding="0 0.75rem 0.75rem">
          <Button
            as="a"
            variant="solid"
            borderRadius="lg"
            colorScheme="telegram"
            size="md"
            my={1}
            width="full"
            href={`/practice/play/${presetData.id}`}
          >
            Start
          </Button>
        </HStack>
      </Flex>
    </motion.div>
  );
};
export default PracticePresetCard;

import React from 'react';
import { Text, useColorModeValue } from '@chakra-ui/react';

interface PracticePresetCardStatProps {
  text: string;
}

export const PracticePresetCardStat: React.FC<PracticePresetCardStatProps> = ({ text }) => {
  const bgColor = useColorModeValue('gray.300', 'gray.700');
  return (
    <Text as="h3" fontSize="md" fontWeight={600} textAlign="center" rounded="lg" backgroundColor={bgColor} p={2}>
      {text}
    </Text>
  );
};

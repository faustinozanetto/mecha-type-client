import React from 'react';
import { Text, useColorModeValue } from '@chakra-ui/react';

interface PracticePresetCardStatProps {}

export const PracticePresetCardStat: React.FC<PracticePresetCardStatProps> = ({ children }) => {
  const bgColor = useColorModeValue('gray.300', 'gray.700');
  return (
    <Text as="h3" fontSize={15} fontWeight={600} textAlign="center" rounded="lg" backgroundColor={bgColor} p={2}>
      {children}
    </Text>
  );
};

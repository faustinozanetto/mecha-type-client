import React from 'react';
import { PresetCreationForm } from './preset-creation-form';
import { Flex, useColorModeValue } from '@chakra-ui/react';

interface PresetCreationProps {
  /** Method to call when the preset was created */
  onCreatedCallback: () => void;
}

const PresetCreation: React.FC<PresetCreationProps> = ({ onCreatedCallback }) => {
  const topBg = useColorModeValue('gray.300', 'gray.700');

  return (
    <Flex
      padding="1rem"
      borderRadius="2xl"
      boxShadow="xl"
      justifyContent="space-between"
      width="sm"
      backgroundColor={topBg}
    >
      <PresetCreationForm onCreatedCallback={onCreatedCallback} />
    </Flex>
  );
};
export default PresetCreation;

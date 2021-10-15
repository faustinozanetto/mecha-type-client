import React from 'react';
import { Flex, Button, Text, VStack, useColorModeValue, HStack } from '@chakra-ui/react';

interface EditUserProfileSelectionProps {
  onProfileSelected: () => void;
  onPracticeSelected: () => void;
  onGoBackCallback: () => void;
}

const EditUserProfileSelection: React.FC<EditUserProfileSelectionProps> = (props): JSX.Element => {
  const { onPracticeSelected, onProfileSelected, onGoBackCallback } = props;
  const backgroundColor = useColorModeValue('gray.300', 'gray.700');

  return (
    <Flex
      padding="1rem"
      borderRadius="2xl"
      boxShadow="xl"
      maxWidth="md"
      justifyContent="space-between"
      backgroundColor={backgroundColor}
    >
      <VStack justify="center" textAlign="center">
        <Text as="h2" fontSize="3xl" fontWeight={600} width="100%">
          Select Settings
        </Text>
        <Text as="p" fontWeight={500} width="100%">
          Here you can choose to modify your own profile settings such as description and more; or tweak the practice
          settings.
        </Text>
        <HStack width="100%" paddingTop={2}>
          <Button width="50%" colorScheme="linkedin" onClick={onProfileSelected}>
            Profile
          </Button>
          <Button width="50%" onClick={onPracticeSelected}>
            Practice
          </Button>
        </HStack>
        <Button width="100%" variant="ghost" colorScheme="red" onClick={onGoBackCallback}>
          Go back
        </Button>
      </VStack>
    </Flex>
  );
};

export default EditUserProfileSelection;

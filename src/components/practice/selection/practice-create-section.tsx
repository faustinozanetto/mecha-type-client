import React from 'react';
import { Button, Text, useColorModeValue, Container } from '@chakra-ui/react';

interface PracticeCreateSectionProps {}

export const PracticeCreateSection: React.FC<PracticeCreateSectionProps> = ({}) => {
  const bgColor = useColorModeValue('gray.300', 'gray.900');
  return (
    <Container
      display="flex"
      flexDir="column"
      rounded="lg"
      alignItems="center"
      backgroundColor={bgColor}
      maxWidth="3xl"
      m={4}
      p={4}
    >
      <Text as="h2" fontWeight={600} fontSize="3xl">
        What about creating your own?
      </Text>
      <Text as="p" fontWeight={500} fontSize="md" mx={12} textAlign="center">
        If you feel like no preset fits you, you can have a try at creating your own custom preset. You can use it
        later, as it is saved to your profile!.
      </Text>
      <Button as="a" href="/practice/create" my={4} colorScheme="twitter" rounded="xl" size="lg">
        Start Creating
      </Button>
    </Container>
  );
};

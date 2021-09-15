import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';

interface NotFoundErrorProps {}

export const NotFoundError: React.FC<NotFoundErrorProps> = ({}) => {
  return (
    <Flex backgroundColor="#111827" minWidth="100vw" minHeight="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDir="column"
        width="full"
        padding={8}
        maxWidth="lg"
        alignItems="center"
        rounded="lg"
        backgroundColor="gray.800"
        textAlign="center"
        ml="auto"
        mr="auto"
      >
        <Text as="h1" fontSize="3rem" fontWeight={700} color="white">
          Error 404
        </Text>
        <Text as="p" fontSize="lg" fontWeight={500} color="white">
          The page you requested does not exists! If you think this may be wrong, please contact us as soon as possible.
          Thank you, Mecha Team
        </Text>
        <Button as="a" href="/" size="lg" mx={4} mt={4} colorScheme="blue">
          Return Home
        </Button>
      </Flex>
    </Flex>
  );
};

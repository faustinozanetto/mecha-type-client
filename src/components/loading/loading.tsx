import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => {
  return (
    <Flex backgroundColor="#111827" minWidth="100vw" minHeight="100vh" alignItems="center" justifyContent="center">
      <Heading as="h1" fontSize="4xl" fontWeight={700} color="#fff">
        Loading...
      </Heading>
    </Flex>
  );
};

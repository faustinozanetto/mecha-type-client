import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';

interface CoreLayoutContainerProps {
  /** Children to display inside container */
  children: React.ReactNode;
}

const CoreLayoutContainer: React.FC<CoreLayoutContainerProps> = (props): JSX.Element => {
  return (
    <Container maxW={['1xl', '2xl', '3xl', '5xl', '7xl']} minHeight={'100vh'} py={4} centerContent>
      {props.children}
    </Container>
  );
};

export default CoreLayoutContainer;

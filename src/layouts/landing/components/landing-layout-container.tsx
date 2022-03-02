import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';

interface LandingLayoutContainerProps {
  /** Children to display inside container */
  children: React.ReactNode;
}

const LandingLayoutContainer: React.FC<LandingLayoutContainerProps> = (props): JSX.Element => {
  return (
    <Container maxW={['1xl', '2xl', '3xl']} minHeight={'100vh'} py={4}>
      {props.children}
    </Container>
  );
};

export default LandingLayoutContainer;

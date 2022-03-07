import React from 'react';
import { Container } from '@chakra-ui/react';

interface CoreLayoutContainerProps {
  /** Children to display inside container */
  children: React.ReactNode;
}

const CoreLayoutContainer: React.FC<CoreLayoutContainerProps> = (props): JSX.Element => {
  return (
    <Container maxW={['1xl', '2xl', '3xl', '5xl', '7xl']} centerContent my={10}>
      {props.children}
    </Container>
  );
};

export default CoreLayoutContainer;

import { Container } from '@chakra-ui/react';
import React from 'react';

interface LayoutCoreContainerProps {
  /** Children to display inside container */
  children: React.ReactNode;
}

const LayoutCoreContainer: React.FC<LayoutCoreContainerProps> = (props): JSX.Element => {
  const { children } = props;

  return (
    <Container
      maxW={['1xl', '2xl', '3xl', '4xl']}
      paddingTop="1rem"
      paddingBottom="1rem"
      minHeight="calc(100vh - 10rem)"
      centerContent
    >
      {children}
    </Container>
  );
};

export default LayoutCoreContainer;

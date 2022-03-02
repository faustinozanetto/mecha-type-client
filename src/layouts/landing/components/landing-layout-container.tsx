import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';

interface LandingLayoutContainerProps {
  /** Children to display inside container */
  children: React.ReactNode;
}

const LandingLayoutContainer: React.FC<LandingLayoutContainerProps> = (props): JSX.Element => {
  return <Box minHeight={'100vh'}>{props.children}</Box>;
};

export default LandingLayoutContainer;

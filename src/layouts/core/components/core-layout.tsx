import React from 'react';
import { Box, Flex, Text, Grid, useColorModeValue } from '@chakra-ui/react';
import CoreLayoutHead, { CoreLayoutHeadProps } from './core-layout-head';
import CoreLayoutContainer from './core-layout-container';
import Sidebar from '@components/sidebar/sidebar';
import useAuth from '@contexts/UserContext';
import Footer from '@components/footer/footer';

export interface LayoutCoreProps {
  children: React.ReactNode;
  head?: React.FC<CoreLayoutHeadProps>;
  headProps?: CoreLayoutHeadProps;
  error?: any;
}

const CoreLayout: React.FC<LayoutCoreProps> = (props): JSX.Element => {
  const { children, head: Head = CoreLayoutHead, headProps, error } = props;
  const { user } = useAuth();
  const mainContainerBG = useColorModeValue('gray.200', 'gray.800');

  return (
    <Grid
      role="main"
      gridTemplateColumns={['1fr', '80px 1fr', '80px 1fr', '80px 1fr', '250px 1fr']}
      gridTemplateRows="1fr"
    >
      {/* SEO Head */}
      <Head {...headProps} />

      {/* Sidebar */}
      <Box position="relative">{<Sidebar user={user} />}</Box>

      {/* Main container */}
      <Flex flexDir="column" minHeight="100vh" justifyContent="space-between" backgroundColor={mainContainerBG}>
        {/* Content */}
        {error ? <Text>Error</Text> : <CoreLayoutContainer>{children}</CoreLayoutContainer>}
        {/* Footer */}
        <Footer />
      </Flex>
    </Grid>
  );
};

export default CoreLayout;

import React from 'react';
import { Box, Flex, Text, Grid, useColorModeValue } from '@chakra-ui/react';
import Sidebar from '@components/sidebar/sidebar';
import useAuth from '@contexts/UserContext';
import Footer from '@components/footer/footer';
import LandingLayoutHead, { LandingLayoutHeadProps } from './landing-layout-head';
import LandingLayoutContainer from './landing-layout-container';
import LandingNavbar from '@components/landing/navbar/landing-navbar';

export interface LandingLayoutProps {
  children: React.ReactNode;
  head?: React.FC<LandingLayoutHeadProps>;
  headProps?: LandingLayoutHeadProps;
  error?: any;
}

const LandingLayout: React.FC<LandingLayoutProps> = (props): JSX.Element => {
  const { children, head: Head = LandingLayoutHead, headProps, error } = props;
  const { user } = useAuth();

  return (
    <Box role="main" minHeight="100vh">
      {/* SEO Head */}
      <Head {...headProps} />

      {/* Navbar */}
      <LandingNavbar />

      {/* Main container */}
      <Flex flexDir="column" minHeight="100vh">
        {/* Content */}
        {error ? <Text>Error</Text> : <LandingLayoutContainer>{children}</LandingLayoutContainer>}
        {/* Footer */}
        <Footer />
      </Flex>
    </Box>
  );
};

export default LandingLayout;

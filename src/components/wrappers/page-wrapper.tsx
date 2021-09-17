import React from 'react';
import dynamic from 'next/dynamic';
import { Flex, Grid, Box, useColorModeValue } from '@chakra-ui/react';
import { UserFragment } from '@generated/graphql';

const Sidebar = dynamic(() => import('@components/sidebar/sidebar'));
const Footer = dynamic(() => import('@components/footer/footer'));

interface PageWrapperProps {
  /** User data */
  user: UserFragment;
  /** Children */
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ user, children }) => {
  return (
    <Grid
      gridTemplateColumns={['1fr', '80px 1fr', '80px 1fr', '80px 1fr', '250px 1fr']}
      gridTemplateRows="1fr"
      minHeight="100vh"
    >
      <Box position="relative">
        <Sidebar user={user} />
      </Box>
      <Flex flexDir="column" backgroundColor={useColorModeValue('gray.200', 'gray.800')} minHeight="100vh">
        {children}
        <Footer />
      </Flex>
    </Grid>
  );
};

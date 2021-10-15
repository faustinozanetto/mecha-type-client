import React from 'react';
import LayoutCoreContainer from './layout-core-container';
import LayoutCoreHead, { LayoutCoreHeadProps } from './layout-core-head';
import { Box, Flex, Grid, useColorModeValue } from '@chakra-ui/react';
import Sidebar, { SidebarProps } from '@components/sidebar/sidebar';
import { createLogger } from '@modules/core/logging/mecha-logger';
import { UserFragment } from '@generated/graphql';
import Footer from '@components/footer/footer';

export interface LayoutCoreProps {
  /**
   * Content to display within the layout.
   *
   * Essentially, the page's content.
   */
  children: React.ReactNode;
  /**
   * Props forwarded to the Head component.
   *
   * Essentially, SEO metadata, etc.
   * Will use sane defaults if not specified.
   */
  headProps?: LayoutCoreHeadProps;
  /**
   * Component to use as Head.
   *
   * @default BaseHead
   */
  Head?: React.FC<LayoutCoreHeadProps>;
  /**
   * Wrapper container for the page.
   *
   * By default, uses CorePageContainer component.
   */
  PageContainer?: React.FC;
  /**
   *
   */
  user?: UserFragment;
  /** Errors */
  error?: any;
}

const fileLabel = 'layouts/core/components/layout-core';
const logger = createLogger({
  fileLabel,
});

const LayoutCore: React.FC<LayoutCoreProps> = (props): JSX.Element => {
  const { children, error, headProps = {}, user, PageContainer = LayoutCoreContainer, Head = LayoutCoreHead } = props;

  return (
    <Grid
      role="main"
      gridTemplateColumns={['1fr', '80px 1fr', '80px 1fr', '80px 1fr', '250px 1fr']}
      gridTemplateRows="1fr"
      minHeight="100vh"
    >
      {/* SEO Head */}
      <Head {...headProps} />

      {/* Sidebar */}
      <Box position="relative">{<Sidebar user={user} />}</Box>

      {/* Main container */}
      <Flex flexDir="column" backgroundColor={useColorModeValue('gray.200', 'gray.800')} minHeight="100vh">
        {/* Content */}
        {error ? <h1>Error</h1> : <PageContainer>{children}</PageContainer>}
        {/* Footer */}
        <Footer />
      </Flex>
    </Grid>
  );
};

export default LayoutCore;

import React from 'react';
import LayoutCoreContainer from './layout-core-container';
import LayoutCoreHead, { LayoutCoreHeadProps } from './layout-core-head';
import { Box, Flex, Grid, useColorModeValue } from '@chakra-ui/react';
import Sidebar, { SidebarProps } from '@components/sidebar/sidebar';
import { createLogger } from '@modules/core/logging/mecha-logger';

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
   * Component to use as Footer.
   *
   * @default BaseFooter
   */
  Footer?: React.FC;
  /**
   * Wrapper container for the page.
   *
   * By default, uses CorePageContainer component.
   */
  PageContainer?: React.FC;
  /**
   * Component to use as Sidebar.
   *
   * @default Sidebar
   */
  Sidebar?: typeof Sidebar;
  /**
   * Props forwarded to the Sidebar component.
   *
   */
  sidebarProps?: SidebarProps;
  /** Errors */
  error?: any;
}

const fileLabel = 'layouts/core/components/layout-core';
const logger = createLogger({
  fileLabel,
});

const LayoutCore: React.FC<LayoutCoreProps> = (props): JSX.Element => {
  const {
    children,
    error,
    headProps = {},
    PageContainer = LayoutCoreContainer,
    Head = LayoutCoreHead,
    Footer = null,
    Sidebar = null,
    sidebarProps,
  } = props;

  return (
    <Grid
      role="main"
      gridTemplateColumns={['1fr', '80px 1fr', '80px 1fr', '80px 1fr', '250px 1fr']}
      gridTemplateRows="1fr"
      minHeight="100vh"
    >
      {/* SEO Head */}
      <Head {...headProps} />
      {/* Main */}
      {/* Nav */}
      <Box position="relative">{Sidebar && <Sidebar {...sidebarProps} />}</Box>
      <Flex flexDir="column" backgroundColor={useColorModeValue('gray.200', 'gray.800')} minHeight="100vh">
        {error ? <h1>Error</h1> : <PageContainer>{children}</PageContainer>}
        {/* Footer */}
        {Footer && <Footer />}
      </Flex>
    </Grid>
  );
};

export default LayoutCore;

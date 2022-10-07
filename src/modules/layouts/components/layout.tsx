import useMediaQuery from '@hooks/use-media-query';
import Sidebar from '@modules/sidebar/components/sidebar';
import SidebarProvider from '@modules/sidebar/context/sidebar-context';
import React, { useMemo } from 'react';

import LayoutHead from './layout-head';

interface ILayoutProps {
  children?: React.ReactNode;
  headProps?: React.ComponentPropsWithoutRef<typeof LayoutHead>;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const { children, headProps } = props;
  const isMediumDevice = useMediaQuery('(max-width: 768px');
  const isSmallDevice = useMediaQuery('(max-width: 380px');

  const layoutGridColumns = useMemo(() => {
    if (isSmallDevice) return '1fr';
    if (isMediumDevice) return 'auto 1fr';
    return 'auto 1fr';
  }, [isMediumDevice, isSmallDevice]);

  return (
    <div
      className="grid min-h-screen overflow-hidden subpixel-antialiased"
      style={{
        gridTemplateColumns: layoutGridColumns,
      }}
    >
      {/* Head */}
      <LayoutHead {...headProps} />

      {/* Sidebar */}
      <SidebarProvider>
        <Sidebar />{' '}
      </SidebarProvider>

      {/* Content */}
      <div className="flex flex-col p-4 sm:p-8 md:p-12">
        {/* Children */}
        {children}
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

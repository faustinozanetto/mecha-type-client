import Sidebar from '@modules/sidebar/components/sidebar';
import SidebarProvider from '@modules/sidebar/context/sidebar-context';
import React from 'react';

import LayoutHead from './layout-head';

interface ILayoutProps {
  children?: React.ReactNode;
  headProps?: React.ComponentPropsWithoutRef<typeof LayoutHead>;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const { children, headProps } = props;

  return (
    <div
      className="grid min-h-screen grid-cols-2 overflow-hidden subpixel-antialiased"
      style={{
        gridTemplateColumns: 'auto 1fr',
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

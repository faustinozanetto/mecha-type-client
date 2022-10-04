import Sidebar from '@modules/sidebar/components/sidebar';
import { useSidebarContext } from '@modules/sidebar/context/sidebar-context';
import React from 'react';

import LayoutHead from './layout-head';

interface ILayoutProps {
  children?: React.ReactNode;
  headProps?: React.ComponentPropsWithoutRef<typeof LayoutHead>;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const { children, headProps } = props;
  const { isCollapsed } = useSidebarContext();

  return (
    <div
      className="grid min-h-screen overflow-hidden subpixel-antialiased"
      style={{
        gridTemplateColumns: isCollapsed ? '80px 1fr' : 'auto 1fr',
      }}
    >
      {/* Head */}
      <LayoutHead {...headProps} />

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex flex-col p-4 sm:p-6 md:p-8">
        {/* Children */}
        {children}
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

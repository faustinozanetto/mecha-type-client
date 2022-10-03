import Sidebar from '@modules/sidebar/components/sidebar';
import React from 'react';

import LayoutHead from './layout-head';

interface ILayoutProps {
  children?: React.ReactNode;
  headProps?: React.ComponentPropsWithoutRef<typeof LayoutHead>;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const { children, headProps } = props;

  return (
    <div className="grid min-h-screen grid-cols-main overflow-hidden subpixel-antialiased transition-all">
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

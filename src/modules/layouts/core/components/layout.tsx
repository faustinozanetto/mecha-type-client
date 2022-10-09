import useMediaQuery from '@hooks/use-media-query';
import { usePreferencesContext } from '@modules/preferences/context/preferences-context';
import Sidebar from '@modules/sidebar/components/sidebar';
import SidebarProvider from '@modules/sidebar/context/sidebar-context';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';

import LayoutHead from './layout-head';

interface ILayoutProps {
  children?: React.ReactNode;
  headProps?: React.ComponentPropsWithoutRef<typeof LayoutHead>;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const { children, headProps } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { state } = usePreferencesContext();
  const isMediumDevice = useMediaQuery('(max-width: 768px');
  const isSmallDevice = useMediaQuery('(max-width: 400px');

  const layoutGridColumns = useMemo(() => {
    if (isSmallDevice) return '1fr';
    if (isMediumDevice) return 'auto 1fr';
    return 'auto 1fr';
  }, [isMediumDevice, isSmallDevice]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <>
      {isLoading && (
        <div
          className={clsx(
            state.accentColors,
            'fixed inset-0 flex h-screen w-screen items-center justify-center bg-bg'
          )}
        >
          <div className="flex max-w-[500px] flex-wrap items-center justify-center gap-x-8">
            <div className="flex flex-col items-center gap-4">
              <p className="hidden">Monkeytype Clone - Typeracer App based on Monkeytype</p>
              <div className="loading font-primary text-fg">Preparing the page for you...</div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div
          className={clsx('grid min-h-screen overflow-hidden subpixel-antialiased', state.accentColors)}
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
          <div className="flex flex-col bg-bg p-4 sm:p-8 md:p-12">
            {/* Children */}
            {children}
          </div>

          {/* Footer */}
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
};

export default Layout;

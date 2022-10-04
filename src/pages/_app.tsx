import '../styles/globals.css';

import type { AppProps } from 'next/app';
import React from 'react';
import SidebarProvider from '@modules/sidebar/context/sidebar-context';
import { trpc } from '@lib/trpc';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
};

export default trpc.withTRPC(MechaApp);

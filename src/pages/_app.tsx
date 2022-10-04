import '../styles/globals.css';

import type { AppType } from 'next/app';
import React from 'react';
import SidebarProvider from '@modules/sidebar/context/sidebar-context';
import { trpc } from '@lib/trpc';
import AuthWrapper from '@modules/auth/components/auth-wrapper';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

const MechaApp: AppType<{ session: Session | null }> = ({ Component, pageProps }) => {
  return (
    <AuthWrapper session={pageProps.session}>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </AuthWrapper>
  );
};

MechaApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(MechaApp);

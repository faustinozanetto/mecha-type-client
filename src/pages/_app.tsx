import '../styles/globals.css';

import type { AppType } from 'next/app';
import React from 'react';
import { trpc } from '@lib/trpc';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthWrapper from '@modules/auth/components/auth-wrapper';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import ThemeProvider from '@modules/theme/context/theme-context';

const MechaApp: AppType<{ session: Session | null }> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <AuthWrapper session={pageProps.session}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthWrapper>
    </ThemeProvider>
  );
};

MechaApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(MechaApp);

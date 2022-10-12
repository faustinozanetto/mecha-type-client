import '../styles/globals.css';
import '../styles/accent-colors.css';

import type { AppType } from 'next/app';
import React from 'react';
import { trpc } from '@lib/trpc';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthWrapper from '@modules/auth/components/auth-wrapper';
import { Session } from 'next-auth';
import ThemeProvider from '@modules/theme/context/theme-context';
import PreferencesProvider from '@modules/preferences/context/preferences-context';
import UserProfileProvider from '@modules/profile/context/user-profile-context';

const MechaApp: AppType<{ session: Session | null }> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <UserProfileProvider>
          <AuthWrapper session={pageProps.session}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthWrapper>
        </UserProfileProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MechaApp);

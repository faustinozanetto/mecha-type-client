import '../styles/globals.css';
import '../styles/accent-colors.css';

import { trpc } from '@lib/trpc';
import AuthWrapper from '@modules/auth/components/auth-wrapper';
import PreferencesProvider from '@modules/preferences/context/preferences-context';
import UserProfileProvider from '@modules/profile/context/user-profile-context';
import ThemeProvider from '@modules/theme/context/theme-context';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import React from 'react';

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

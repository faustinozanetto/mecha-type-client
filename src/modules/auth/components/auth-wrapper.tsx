import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface IAuthWrapperProps {
  children: React.ReactNode;
  session: Session | null;
}

const AuthWrapper: React.FC<IAuthWrapperProps> = (props) => {
  const { session, children } = props;
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthWrapper;

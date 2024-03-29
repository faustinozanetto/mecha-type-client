import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useMeQuery, User } from '@generated/graphql';

export interface AuthContextState {
  user?: User;
  loading: boolean;
}

// Create context
const AuthContext = createContext<AuthContextState>({} as AuthContextState);

// Export the provider as we need to wrap the entire app with it
export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { data: userData, loading: meLoading } = useMeQuery({});
  const [user, setUser] = useState<User>();

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.
  useEffect(() => {
    if (userData && userData.me) {
      // @ts-ignore
      setUser(userData?.me?.user);
    }
  }, [userData, meLoading]);

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      loading: meLoading,
    }),
    [user, meLoading]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

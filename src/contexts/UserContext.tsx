import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useLogoutMutation, useMeQuery, User } from '@generated/graphql';

type ActionType = { type: 'LOGIN'; user: User } | { type: 'LOGOUT' };

export interface AuthContextState {
  user?: User;
  loading: boolean;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextState>({} as AuthContextState);

// Export the provider as we need to wrap the entire app with it
export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { data: userData, loading: meLoading } = useMeQuery();
  const [logoutMutation] = useLogoutMutation();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

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
    setLoadingInitial(false);
  }, [meLoading]);

  // Call the logout endpoint and then remove the user
  // from the state.
  function logout() {
    logoutMutation().then(() => setUser(undefined));
  }

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
      loading,
      logout,
    }),
    [user, loading]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return <AuthContext.Provider value={memoedValue}>{!loadingInitial && children}</AuthContext.Provider>;
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

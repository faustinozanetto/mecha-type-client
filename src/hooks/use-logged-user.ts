import { DefaultSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

const useLoggedUser = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [user, setUser] = useState<DefaultSession['user']>();

  useEffect(() => {
    if (sessionStatus === 'authenticated' && session.user) {
      setUser(session.user);
    }
  }, [sessionStatus]);

  const memoizedUser = useMemo(() => {
    return user;
  }, [user]);

  const isLoggedIn = useMemo(() => {
    return sessionStatus === 'authenticated';
  }, [sessionStatus]);

  return { user: memoizedUser, isLoggedIn };
};

export default useLoggedUser;

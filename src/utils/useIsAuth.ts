import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

export const useIsAuth = () => {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated' && !data?.user?.name) {
      signIn();
    }
  }, [status, data, router]);
};

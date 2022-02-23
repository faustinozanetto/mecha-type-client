import useSession from '@hooks/user/useSession';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useIsAuth = () => {
  const { data, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (data === undefined) router.push('/auth/signin');
    }
  }, [loading, data, router]);
};

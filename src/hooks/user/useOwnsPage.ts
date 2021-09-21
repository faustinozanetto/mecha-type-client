/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import useSession from './useSession';

const useOwnsPage = (userId: string) => {
  const [ownsPage, setOwnsPage] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (userId) {
      const validate = async () => {
        if (session?.id) {
          setOwnsPage(session.id === userId);
        }
      };
      validate();
    }
  }, [session?.id, userId]);

  return {
    ownsPage,
  };
};

export default useOwnsPage;

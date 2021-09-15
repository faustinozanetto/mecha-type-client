/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

const useOwnsPage = (userEmail: string) => {
  const [ownsPage, setOwnsPage] = useState(false);

  useEffect(() => {
    if (userEmail) {
      const validate = async () => {
        const session = await getSession();

        if (session?.user?.email) {
          setOwnsPage(session.user.email === userEmail);
        }
      };
      validate();
    }
  }, [userEmail]);

  return {
    ownsPage,
  };
};

export default useOwnsPage;

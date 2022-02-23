import { __BACKEND__ } from '@utils/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';

export type UserSession = {
  id: string;
  username: string;
};

const useSession = () => {
  const [data, setData] = useState<UserSession>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get<UserSession>(`${__BACKEND__}/api/auth/status`, {
          withCredentials: true,
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => setError(true))
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
    if (data?.id === undefined) {
      setError(true);
    }
  }, []);

  return { loading, error, data };
};

export default useSession;

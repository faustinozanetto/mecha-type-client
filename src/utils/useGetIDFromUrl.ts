import { useRouter } from 'next/router';

/**
 *
 * @returns the id of the dynamic route.
 */
export const useGetIDFromUrl = () => {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  return id;
};

import { ApolloError } from '@apollo/client';
import { createStandaloneToast } from '@chakra-ui/react';

/**
 *
 * @param error Apollo Error to populate the toast with.
 * @returns the id of the created toast.
 */
export const convertApolloErrorToToast = (error: ApolloError) => {
  const toast = createStandaloneToast();

  return toast({
    title: 'An error occurred.',
    description: error.message,
    status: 'error',
    duration: 9000,
    isClosable: true,
  });
};

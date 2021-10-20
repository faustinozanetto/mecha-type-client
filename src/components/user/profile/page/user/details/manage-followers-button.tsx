import React from 'react';
import FiSettings from '@meronex/icons/fi/FiSettings';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChatIcon } from '@chakra-ui/icons';

interface ManageFollowersButtonProps {
  /** Wether content is loading or not */
  loading: boolean;
}

const ManageFollowersButton: React.FC<ManageFollowersButtonProps> = ({ loading }) => {
  const { query } = useRouter();
  return (
    <Button
      as="a"
      href={`/user/${query.name}/followers`}
      colorScheme="purple"
      variant="solid"
      size="lg"
      fontSize="lg"
      marginBottom="1rem"
      borderRadius="lg"
      width={['100%', '100%', '100%']}
      minWidth="3rem"
      leftIcon={<ChatIcon />}
      isLoading={loading}
      loadingText="Loading"
    >
      Followers
    </Button>
  );
};

export default ManageFollowersButton;

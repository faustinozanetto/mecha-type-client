import React from 'react';
import FiUserX from '@meronex/icons/fi/FiUserX';
import FiUserPlus from '@meronex/icons/fi/FiUserPlus';
import { useFollowUserMutation, UserFragment, useUnfollowUserMutation } from 'generated/graphql';
import { useTranslation } from 'next-i18next';
import { Button, useToast } from '@chakra-ui/react';

interface FollowButtonProps {
  /** Wether content is loading or not */
  loading: boolean;
  /** Current logged in user */
  user: UserFragment;
  /** Target user to edit profile */
  targetUser: UserFragment;
  /** Wether the user already follows the target user or not. */
  followsUser: boolean;
  /** Wether the current logged in user is equal as the target one */
  sameUser: boolean;
  /** Used to re fetch the user follows query */
  followsUserRefetch: any;
  /** Used to re fetch the followers list query */
  followersRefetch: any;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  loading,
  user,
  targetUser,
  followsUser,
  sameUser,
  followsUserRefetch,
  followersRefetch,
}) => {
  const { t } = useTranslation('user-profile');
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const toast = useToast();

  const handleFollow = async () => {
    if (user?.id) {
      if (sameUser) {
        toast({
          title: 'An error occurred!',
          description: 'You can´t follow yourself :/',
          status: 'error',
          duration: 3000,
          position: 'bottom-right',
        });
      } else if (followsUser && user.id) {
        await unfollowUser({
          variables: {
            userId: targetUser.id,
            followerId: user.id,
          },
        });
        toast({
          title: 'Success',
          description: `You are now longer following ${targetUser.username}`,
          status: 'success',
          duration: 3000,
          position: 'bottom-right',
        });
      } else if (!followsUser && user.id) {
        await followUser({
          variables: {
            userId: targetUser.id,
            followerId: user.id,
          },
        });
        toast({
          title: 'Success',
          description: `You now following ${targetUser.username}`,
          status: 'success',
          duration: 3000,
          position: 'bottom-right',
        });
      }
      if (user.id !== targetUser.id) {
        followsUserRefetch();
        followersRefetch();
      }
    } else {
      toast({
        title: 'An error occurred!',
        description: 'You are not logged in!',
        status: 'warning',
        duration: 3000,
        position: 'bottom-right',
      });
    }
  };

  return (
    <Button
      colorScheme={followsUser ? 'red' : 'green'}
      variant="solid"
      size="lg"
      fontSize="lg"
      borderRadius="lg"
      width={['100%', '100%', '100%']}
      minWidth="3rem"
      marginBottom="1rem"
      leftIcon={followsUser ? <FiUserX /> : <FiUserPlus />}
      isLoading={loading}
      loadingText="Loading"
      onClick={handleFollow}
    >
      {followsUser ? t('unfollow-user') : t('follow-user')}
    </Button>
  );
};

export default FollowButton;

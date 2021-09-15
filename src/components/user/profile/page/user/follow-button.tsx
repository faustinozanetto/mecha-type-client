import React, { useEffect, useState } from 'react';
import { RiUserFollowLine } from 'react-icons/ri';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { useFollowsUserQuery, useFollowUserMutation, User, useUnfollowUserMutation } from 'generated/graphql';
import { useTranslation } from 'next-i18next';
import { Button, useToast } from '@chakra-ui/react';

import { Session } from 'next-auth';
interface FollowButtonProps {
  user: User;
  /** Target user to edit profile */
  targetUser: User;
  /** Wether the current logged in user is equal as the target one */
  sameUser: boolean;
  /**
   * Used to re fetch the followers list query
   */
  followersRefetch: any;
  /** Session object */
  session: Session;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  user,
  targetUser,
  sameUser,
  followersRefetch,
  session,
}) => {
  const { t } = useTranslation('user-profile');
  const [alreadyFollows, setAlreadyFollows] = useState(false);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const toast = useToast();

  const {
    data: followsUserData,
    loading: followsUserLoading,
    refetch: followsUserRefetch,
  } = useFollowsUserQuery({
    skip: !user || !targetUser || user?.id === targetUser?.id,
    variables: {
      userId: user?.id!,
      targetUserId: targetUser?.id,
    },
  });

  useEffect(() => {
    if (followsUserData?.followsUser) {
      setAlreadyFollows(followsUserData?.followsUser?.valueOf()!);
    } else {
      setAlreadyFollows(false);
    }
  }, [followsUserData]);

  const handleFollow = async () => {
    if (session?.user?.email) {
      if (sameUser) {
        toast({
          title: 'An error occurred!',
          description: 'You can´t follow yourself :/',
          status: 'error',
          duration: 3000,
          position: 'bottom-right',
        });
      } else if (alreadyFollows && user && session?.user?.name) {
        await unfollowUser({
          variables: {
            userId: user.id,
            targetUserId: targetUser.id,
          },
        });
      } else if (session?.user?.name && user) {
        await followUser({
          variables: {
            userId: user.id,
            targetUserId: targetUser.id,
          },
        });
      }
      followsUserRefetch();
      followersRefetch();
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
      colorScheme={alreadyFollows ? 'red' : 'green'}
      variant="solid"
      size="lg"
      fontSize="lg"
      borderRadius="lg"
      width={['100%', '100%', '100%']}
      minWidth="3rem"
      marginBottom="1rem"
      leftIcon={alreadyFollows ? <RiUserUnfollowLine /> : <RiUserFollowLine />}
      isLoading={followsUserLoading}
      loadingText="Loading"
      onClick={handleFollow}
    >
      {alreadyFollows ? t('unfollow-user') : t('follow-user')}
    </Button>
  );
};

import React, { useEffect, useState } from 'react';
import FiUserX from '@meronex/icons/fi/FiUserX';
import FiUserPlus from '@meronex/icons/fi/FiUserPlus';
import {
  FollowStatus,
  useFollowUserStatusQuery,
  useRequestFollowUserMutation,
  UserFragment,
  useUnfollowUserMutation,
} from 'generated/graphql';
import { useTranslation } from 'next-i18next';
import { Button, useToast } from '@chakra-ui/react';

interface FollowButtonProps {
  /** Wether content is loading or not */
  loading: boolean;
  /** Current logged in user */
  user: UserFragment;
  /** Target user to edit profile */
  targetUser: UserFragment;
  /** Wether the current logged in user is equal as the target one */
  sameUser: boolean;
  refetchUserFollowers: any;
}

const FollowButton: React.FC<FollowButtonProps> = ({ loading, user, targetUser, sameUser, refetchUserFollowers }) => {
  const { t } = useTranslation('user-profile');
  const toast = useToast();
  const [followUserStatus, setFollowUserStatus] = useState<FollowStatus>(FollowStatus.Notsent);
  const [requestFollowUser] = useRequestFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const {
    data: followUserStatusData,
    loading: followUserStatusLoading,
    refetch: followUserStatusRefetch,
  } = useFollowUserStatusQuery({
    skip: user?.id === targetUser?.id,
    variables: {
      userId: targetUser?.id ?? '',
      followerId: user?.id ?? '',
    },
  });

  // Follows User
  useEffect(() => {
    if (followUserStatusData?.followUserStatus?.status) {
      setFollowUserStatus(followUserStatusData.followUserStatus.status);
    }
  }, [followUserStatusData, user, targetUser, loading]);

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
      } else if ((followUserStatus === FollowStatus.Accepted || followUserStatus === FollowStatus.Pending) && user.id) {
        await unfollowUser({
          variables: {
            userId: targetUser.id,
            followerId: user.id,
          },
        });
        toast({
          title: 'Success',
          description: `You are now longer following ${targetUser.username}`,
          status: 'warning',
          duration: 3000,
          position: 'bottom-right',
        });
      } else if (!(followUserStatus === FollowStatus.Accepted) && user.id) {
        await requestFollowUser({
          variables: {
            userId: targetUser.id,
            followerId: user.id,
          },
        });
        toast({
          title: 'Success',
          description: `A follow request has been sent to ${targetUser.username}`,
          status: 'success',
          duration: 3000,
          position: 'bottom-right',
        });
      }
      if (user.id !== targetUser.id) {
        followUserStatusRefetch();
        refetchUserFollowers();
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

  const parseColorScheme = (): string => {
    switch (followUserStatus) {
      case FollowStatus.Accepted:
        return 'red';
      case FollowStatus.Rejected:
        return 'green';
      case FollowStatus.Pending:
        return 'yellow';
      case FollowStatus.Notsent:
        return 'green';
    }
  };

  const parseIcon = (): React.ReactElement => {
    switch (followUserStatus) {
      case FollowStatus.Accepted:
        return <FiUserX />;
      case FollowStatus.Rejected:
        return <FiUserPlus />;
      case FollowStatus.Pending:
        return <FiUserPlus />;
      case FollowStatus.Notsent:
        return <FiUserPlus />;
    }
  };

  const parseLabel = (): string => {
    switch (followUserStatus) {
      case FollowStatus.Accepted:
        return t('unfollow-user');
      case FollowStatus.Rejected:
        return t('follow-user');
      case FollowStatus.Pending:
        return t('follow-pending');
      case FollowStatus.Notsent:
        return t('follow-user');
    }
  };

  return (
    <Button
      colorScheme={parseColorScheme()}
      variant="solid"
      size="lg"
      fontSize="lg"
      borderRadius="lg"
      width={['100%', '100%', '100%']}
      minWidth="3rem"
      marginBottom="1rem"
      leftIcon={parseIcon()}
      isLoading={loading}
      loadingText="Loading"
      onClick={handleFollow}
    >
      {parseLabel()}
    </Button>
  );
};

export default FollowButton;

import { trpc } from '@lib/trpc';
import Layout from '@modules/layouts/core/components/layout';
import UserProfile from '@modules/profile/components/user-profile';
import { ActionType } from '@modules/profile/context/reducer/types';
import { useUserProfileContext } from '@modules/profile/context/user-profile-context';
import type { User } from '@prisma/client';
import type { UserStats } from '@typedefs/mecha-types';
import { EUserStatType } from '@typedefs/mecha-types';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const UserProfilePage: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useUserProfileContext();
  const usernameQuery = router.query.username as string;
  const { status, data } = trpc.users.user.useQuery({ username: usernameQuery });

  useEffect(() => {
    const defaultStats: UserStats = new Map<EUserStatType, string>();
    defaultStats.set(EUserStatType.KEYSTROKES, '200');
    defaultStats.set(EUserStatType.AVERAGE_CPM, '90');
    defaultStats.set(EUserStatType.AVERAGE_WPM, '45');
    defaultStats.set(EUserStatType.TESTS_COMPLETED, '15');

    dispatch({
      type: ActionType.SET_USER,
      payload: {
        user: data as User,
      },
    });
    dispatch({
      type: ActionType.SET_USER_STATS,
      payload: {
        userStats: defaultStats,
      },
    });
  }, [data]);

  useEffect(() => {
    if (status === 'success') {
      dispatch({
        type: ActionType.SET_USER_LOADING,
        payload: {
          userLoading: false,
        },
      });
    } else if (status === 'loading') {
      dispatch({
        type: ActionType.SET_USER_LOADING,
        payload: {
          userLoading: true,
        },
      });
    }
  }, [status]);

  return (
    <Layout
      headProps={{
        title: 'User Profile | Mecha Type',
      }}
    >
      <UserProfile />
    </Layout>
  );
};

export default UserProfilePage;

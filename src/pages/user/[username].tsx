import {trpc} from '@lib/trpc';
import Layout from '@modules/layouts/core/components/layout';

import UserProfile from '@modules/profile/components/user-profile';
import {useUserProfileContext} from '@modules/profile/context/user-profile-context';
import {ActionType} from '@modules/profile/context/reducer/types';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {User} from '@prisma/client';
import {EUserStatType, UserStats} from "@typedefs/mecha-types";

const UserProfilePage: React.FC = ({}) => {
  const router = useRouter();
  const { dispatch } = useUserProfileContext();
  const user = trpc.users.user.useQuery(
    { username: router.query.username as string },
    { retry: router.query.username !== undefined }
  );

  useEffect(() => {
    const defaultStats:UserStats = new Map<EUserStatType, string>();
    defaultStats.set(EUserStatType.KEYSTROKES, "200");
    defaultStats.set(EUserStatType.AVERAGE_CPM, "90");
    defaultStats.set(EUserStatType.AVERAGE_WPM, "45");
    defaultStats.set(EUserStatType.TESTS_COMPLETED, "15");

    dispatch({
      type: ActionType.SET_USER,
      payload: {
        user: user.data as User,
      },
    });
    dispatch({
      type:ActionType.SET_USER_STATS,
      payload: {
        userStats: defaultStats
      }
    })
  }, [user.data]);

  useEffect(() => {
    if (user.status === 'success') {
      dispatch({
        type: ActionType.SET_USER_LOADING,
        payload: {
          userLoading: false,
        },
      });
    } else {
      dispatch({
        type: ActionType.SET_USER_LOADING,
        payload: {
          userLoading: true,
        },
      });
    }
  }, [user.status]);

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

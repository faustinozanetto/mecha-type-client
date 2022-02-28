import React, { useEffect, useState } from 'react';
import { withApollo } from '@modules/core/apollo/apollo';
import LayoutCore from 'layouts/core/components/core-layout';
import { UserFragment, useUserQuery } from 'generated/graphql';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import UserFollowersDashboard from '@components/user/pages/followers-dashboard/user-followers-dashboard';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';
import useAuth from '@contexts/UserContext';

interface UserFollowersPageProps {}

const UserFollowersPage: React.FC<UserFollowersPageProps> = ({}) => {
  const { query } = useRouter();
  const { user: me } = useAuth();
  const [targetUser, setTargetUser] = useState<UserFragment>();

  const { data: userData, loading: userLoading } = useUserQuery({
    variables: {
      where: {
        username: query.name as string,
      },
    },
  });

  // Target User
  useEffect(() => {
    if (userData?.user?.user && !userLoading) {
      setTargetUser(userData.user.user);
    }
  }, [userData]);

  /**
   *
   * @returns wether the user owns the edit page or not.
   */
  const ownsPage = (): boolean => {
    return !userLoading && userData && targetUser && me.id === userData?.user?.user?.id;
  };

  if (!ownsPage()) return <h1>Forbidden</h1>;

  return (
    <LayoutCore
      head={CoreLayoutHead}
      headProps={{
        seoTitle: `${targetUser?.username} Followers | Mecha Type`,
        seoDescription: `${targetUser?.username}´s followers page, showing followers and more information.`,
        seoUrl: `${__URI__!}/user/${targetUser?.username}/followers`,
      }}
    >
      {targetUser && <UserFollowersDashboard user={targetUser} />}
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: { ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])) },
  };
};

export default withApollo({})(UserFollowersPage);

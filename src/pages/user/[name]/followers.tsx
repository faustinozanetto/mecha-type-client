import React, { useEffect, useState } from 'react';
import { withApollo } from '@modules/core/apollo/apollo';
import LayoutCore from 'layouts/core/components/layout-core';
import { useMeQuery, UserFragment, useUserFollowersQuery, useUserQuery } from 'generated/graphql';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import UserFollowersDashboard from '@components/user/pages/followers-dashboard/user-followers-dashboard';

interface UserFollowersPageProps {}

const UserFollowersPage: React.FC<UserFollowersPageProps> = ({}) => {
  const { query } = useRouter();
  const [me, setMe] = useState<UserFragment>();
  const [targetUser, setTargetUser] = useState<UserFragment>();
  const { data: meUserData, loading: meLoading } = useMeQuery({ ssr: true });

  const { data: userData, loading: userLoading } = useUserQuery({
    variables: {
      where: {
        username: query.name as string,
      },
    },
  });

  // Me data
  useEffect(() => {
    if (meUserData?.me?.user && !meLoading) {
      setMe(meUserData.me.user);
    }
  }, [meUserData]);

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
    return (
      !meLoading && !userLoading && userData && targetUser && meUserData?.me?.user?.id === userData?.user?.user?.id
    );
  };

  if (!ownsPage()) return <h1>Forbidden</h1>;

  return (
    <LayoutCore
      user={me}
      headProps={{
        seoTitle: `${targetUser?.username} Followers | Mecha Type`,
        seoDescription: `${targetUser?.username}´s followers page, showing followers and more information.`,
        seoUrl: `${__URI__!}/user/${targetUser?.username}/followers`,
      }}
    >
      <UserFollowersDashboard user={targetUser} />
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

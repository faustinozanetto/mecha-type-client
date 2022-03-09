import React from 'react';
import LayoutCore from 'layouts/core/components/core-layout';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import UserFollowersDashboard from '@components/user/pages/followers-dashboard/user-followers-dashboard';
import { GetStaticPaths, GetStaticProps } from 'next';
import useAuth from '@contexts/UserContext';

interface UserFollowersPageProps {}

const UserFollowersPage: React.FC<UserFollowersPageProps> = (props) => {
  const { user } = useAuth();
  const router = useRouter();

  // Content loading
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <LayoutCore
      headProps={{
        seoTitle: `${user?.username} Followers | Mecha Type`,
        seoDescription: `${user?.username}´s followers page, showing followers and more information.`,
        seoUrl: `${__URI__!}/user/${user?.username}/followers`,
      }}
    >
      {user && <UserFollowersDashboard user={user} />}
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export default UserFollowersPage;

import React, { useEffect, useState } from 'react';
import LayoutCore from 'layouts/core/components/core-layout';
import { User, UserDocument, UserQuery, UserQueryVariables } from 'generated/graphql';
import { __URI__ } from '@utils/constants';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import UserFollowersDashboard from '@components/user/pages/followers-dashboard/user-followers-dashboard';
import useAuth from '@contexts/UserContext';
import { GetStaticPaths, GetStaticProps } from 'next';
import { initializeApollo } from '@modules/core/apollo/ssg-apollo';

interface UserFollowersPageProps {
  targetUser: User;
}

const UserFollowersPage: React.FC<UserFollowersPageProps> = (props) => {
  const { targetUser } = props;
  const router = useRouter();
  const { user: loggedInUser } = useAuth();

  // Content loading
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <LayoutCore
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, params } = context;
  const client = initializeApollo();

  // Target user data fetch.
  const { data: userData } = await client.query<UserQuery, UserQueryVariables>({
    query: UserDocument,
    variables: {
      where: { username: params.name as string },
    },
  });

  // Found user and return the rest of props.
  if (userData.user.user) {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])),

        targetUser: userData.user.user,
      },
    };
  }
  // An error ocurred
  return {
    props: {},
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export default UserFollowersPage;

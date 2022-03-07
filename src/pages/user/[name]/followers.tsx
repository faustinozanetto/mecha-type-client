import React, { useEffect, useState } from 'react';
import { withApollo } from '@modules/core/apollo/ssg-apollo-hoc';
import LayoutCore from 'layouts/core/components/core-layout';
import { User, UserDocument, UserFragment, UserQuery, UserQueryVariables, useUserQuery } from 'generated/graphql';
import { __URI__ } from '@utils/constants';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import UserFollowersDashboard from '@components/user/pages/followers-dashboard/user-followers-dashboard';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';
import useAuth from '@contexts/UserContext';
import { GetStaticPaths, GetStaticProps } from 'next';
import { initializeApollo } from '@modules/core/apollo/ssg-apollo';

interface UserFollowersPageProps {
  targetUser: User;
}

const UserFollowersPage: React.FC<UserFollowersPageProps> = (props) => {
  const { targetUser } = props;
  const router = useRouter();
  const usernameURI = router.query.name as string;
  const { user: loggedInUser } = useAuth();
  const [userOwnsPage, setUserOwnsPage] = useState(false);

  /** Check if the current logged user matches the target user. */
  useEffect(() => {
    if (loggedInUser && targetUser) {
      setUserOwnsPage(loggedInUser.username === usernameURI);
    }
  }, [targetUser, usernameURI, loggedInUser]);

  // Content loading
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  // An error occurred
  if (!targetUser || !loggedInUser) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <LayoutCore
      head={CoreLayoutHead}
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

export default withApollo(UserFollowersPage);

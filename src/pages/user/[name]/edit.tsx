import React, { useEffect, useState } from 'react';
import { withApollo } from '@modules/core/apollo/ssg-apollo-hoc';
import LayoutCore from 'layouts/core/components/core-layout';
import { User, UserDocument, UserQuery, UserQueryVariables } from 'generated/graphql';
import ErrorPage from 'next/error';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CountryEntry } from '@typings/user.types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EditUserProfile from '@components/user/profile/edit/edit-user-profile';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';
import useAuth from '@contexts/UserContext';
import { initializeApollo } from '@modules/core/apollo/ssg-apollo';

interface EditUserPageProps {
  countries: CountryEntry[];
  targetUser: User;
}

const EditUserPage: React.FC<EditUserPageProps> = (props) => {
  const { countries, targetUser } = props;
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
        seoTitle: `Editing ${loggedInUser?.username} | Mecha Type`,
        seoDescription: `${loggedInUser?.username}´s profile page, showing their stats and more information.`,
        seoUrl: `${__URI__!}/user/${loggedInUser?.username}/edit`,
      }}
    >
      <EditUserProfile user={loggedInUser} loading={loggedInUser === null} countries={countries} />
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

  // Countries data fetch.
  let names: CountryEntry[] = [];
  await fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) =>
      data.map((country) => {
        names.push({ name: country.name.common, flag: country.flags.svg });
      })
    );

  // Found user and return the rest of props.
  if (userData.user.user) {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])),
        countries: names ?? [],
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

export default withApollo(EditUserPage);

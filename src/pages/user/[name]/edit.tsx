import React, { useEffect, useState } from 'react';
import LayoutCore from 'layouts/core/components/core-layout';
import {
  User,
  UserDocument,
  UserQuery,
  UserQueryVariables,
  UserSettings,
  UserSettingsDocument,
  UserSettingsQuery,
  UserSettingsQueryVariables,
  useUserSettingsQuery,
} from 'generated/graphql';
import ErrorPage from 'next/error';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CountryEntry } from '@typings/user.types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EditUserProfile from '@components/user/profile/edit/edit-user-profile';
import useAuth from '@contexts/UserContext';
import { initializeApollo } from '@modules/core/apollo/ssg-apollo';
import { withApollo } from '@modules/core/apollo/ssg-apollo-hoc';

interface EditUserPageProps {
  countries: CountryEntry[];
}

const EditUserPage: React.FC<EditUserPageProps> = (props) => {
  const { countries } = props;
  const router = useRouter();
  const { user: loggedInUser } = useAuth();
  const [userSettings, setUserSettings] = useState<UserSettings>();
  const { data: userSettingsData, loading: userSettingsLoading } = useUserSettingsQuery({
    variables: {
      input: { userId: loggedInUser?.id },
    },
  });

  useEffect(() => {
    if (userSettingsData) {
      setUserSettings(userSettingsData.userSettings.userSettings);
    }
  }, [userSettingsData]);

  // Content loading
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <LayoutCore
      headProps={{
        seoTitle: `Editing ${loggedInUser?.username} | Mecha Type`,
        seoDescription: `${loggedInUser?.username}´s profile page, showing their stats and more information.`,
        seoUrl: `${__URI__!}/user/${loggedInUser?.username}/edit`,
      }}
    >
      <EditUserProfile
        user={loggedInUser}
        loading={userSettingsLoading}
        countries={countries}
        userSettings={userSettings}
      />
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
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
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])),
      countries: names ?? [],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export default withApollo(EditUserPage);

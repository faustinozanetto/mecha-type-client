import React from 'react';
import LayoutCore from 'layouts/core/components/core-layout';
import {
  User,
  UserSettings,
  UserSettingsDocument,
  UserSettingsQuery,
  UserSettingsQueryVariables,
  useUserSettingsQuery,
} from 'generated/graphql';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CountryEntry } from '@typings/user.types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EditUserProfile from '@components/user/profile/edit/edit-user-profile';
import useAuth from '@contexts/UserContext';
import { initializeApollo } from '@modules/core/apollo/ssg-apollo';

interface EditUserPageProps {
  countries: CountryEntry[];
  settings: UserSettings;
}

const EditUserPage: React.FC<EditUserPageProps> = (props) => {
  const router = useRouter();
  const { countries, settings } = props;
  const { user, loading } = useAuth();

  // Content loading
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  // No user
  // if (!user && !loading) {
  //   router.push('/auth/signin');
  // }

  return (
    <LayoutCore
      headProps={{
        seoTitle: `Editing ${user?.username} | Mecha Type`,
        seoDescription: `${user?.username}´s profile page, showing their stats and more information.`,
        seoUrl: `${__URI__!}/user/${user?.username}/edit`,
      }}
    >
      {user && <EditUserProfile user={user} loading={false} countries={countries} userSettings={settings} />}
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, params } = context;
  // Countries data fetch.
  let names: CountryEntry[] = [];
  await fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) =>
      data.map((country) => {
        names.push({ name: country.name.common, flag: country.flags.svg });
      })
    );
  const client = initializeApollo();

  const { data: settingsData } = await client.query<UserSettingsQuery, UserSettingsQueryVariables>({
    query: UserSettingsDocument,
    variables: {
      input: { username: params.name as string },
    },
  });

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])),
      countries: names ?? [],
      settings: settingsData.userSettings.userSettings,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export default EditUserPage;

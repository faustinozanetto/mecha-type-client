import React, { useEffect, useState } from 'react';
import { withApollo } from '@modules/core/apollo/apollo';
import LayoutCore from 'layouts/core/components/core-layout';
import { UserFragment, useUserQuery } from 'generated/graphql';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CountryEntry } from '@typings/user.types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EditUserProfile from '@components/user/profile/edit/edit-user-profile';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';
import useAuth from '@contexts/UserContext';

interface EditUserPageProps {
  /** Countries data */
  countries: CountryEntry[];
}

const EditUserPage: React.FC<EditUserPageProps> = ({ countries }) => {
  const { query } = useRouter();
  const { user: loggedInUser, loading: loggedInLoading } = useAuth();
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
    return !userLoading && userData && targetUser && loggedInUser?.id === userData?.user?.user?.id;
  };

  if (!ownsPage()) return <h1>Forbidden</h1>;

  return (
    <LayoutCore
      head={CoreLayoutHead}
      headProps={{
        seoTitle: `Editing ${loggedInUser?.username} | Mecha Type`,
        seoDescription: `${loggedInUser?.username}´s profile page, showing their stats and more information.`,
        seoUrl: `${__URI__!}/user/${loggedInUser?.username}/edit`,
      }}
    >
      {loggedInUser && <EditUserProfile user={loggedInUser} loading={loggedInLoading} countries={countries} />}
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  let names: CountryEntry[] = [];

  await fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) =>
      data.map((country) => {
        names.push({ name: country.name.common, flag: country.flags.svg });
      })
    );

  return {
    props: { countries: names, ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])) },
  };
};

export default withApollo({})(EditUserPage);

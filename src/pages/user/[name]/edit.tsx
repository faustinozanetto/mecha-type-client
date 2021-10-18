import React from 'react';
import { withApollo } from '@modules/core/apollo/apollo';
import LayoutCore from 'layouts/core/components/layout-core';
import { useMeQuery, useUserQuery, useUserSettingsQuery } from 'generated/graphql';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CountryEntry } from 'typings/user';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EditUserProfile from '@components/user/profile/edit/edit-user-profile';

interface EditUserPageProps {
  /** Countries data */
  countries: CountryEntry[];
}

const EditUserPage: React.FC<EditUserPageProps> = ({ countries }) => {
  const { query } = useRouter();
  const { data: userData, loading } = useMeQuery({});
  const { data: targetUser, loading: targetUserLoading } = useUserQuery({
    variables: {
      where: {
        username: query.name as string,
      },
    },
  });
  /**
   *
   * @returns wether the user owns the edit page or not.
   */
  const ownsPage = (): boolean => {
    return (
      !loading && !targetUserLoading && userData && targetUser && userData?.me?.user?.id === targetUser?.user?.user?.id
    );
  };

  if (!ownsPage()) return <h1>Forbidden</h1>;

  return (
    <LayoutCore
      user={userData?.me?.user}
      headProps={{
        seoTitle: `Editing ${targetUser?.user?.user?.username} | Mecha Type`,
        seoDescription: `${targetUser?.user?.user?.username}´s profile page, showing their stats and more information.`,
        seoUrl: `${__URI__!}/user/${targetUser?.user?.user?.username}/edit`,
      }}
    >
      <EditUserProfile user={targetUser.user.user} loading={loading} countries={countries} />
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  let names: CountryEntry[] = [];
  type AxiosResponse = {
    data: CountryEntry[];
  };

  const res = await axios.get<AxiosResponse>('https://countriesnow.space/api/v0.1/countries/flag/images');
  const data = await res.data;
  data.data.map((country: any) => {
    names.push({ name: country.name, flag: country.flag });
  });

  return {
    props: { countries: names, ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])) },
  };
};

export default withApollo({})(EditUserPage);

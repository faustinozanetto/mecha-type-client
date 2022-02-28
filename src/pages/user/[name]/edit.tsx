import React, { useEffect, useState } from 'react';
import { withApollo } from '@modules/core/apollo/apollo';
import LayoutCore from 'layouts/core/components/core-layout';
import { UserFragment, useUserQuery } from 'generated/graphql';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CountryEntry } from '@typings/user.types';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EditUserProfile from '@components/user/profile/edit/edit-user-profile';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';

interface EditUserPageProps {
  /** Countries data */
  countries: CountryEntry[];
  /** Data containing the user info of the current logged in user. */
  me: UserFragment;
}

const EditUserPage: React.FC<EditUserPageProps> = ({ countries, me }) => {
  const { query } = useRouter();
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
        seoTitle: `Editing ${me?.username} | Mecha Type`,
        seoDescription: `${me?.username}´s profile page, showing their stats and more information.`,
        seoUrl: `${__URI__!}/user/${me?.username}/edit`,
      }}
    >
      {me && <EditUserProfile user={me} loading={me.id === null} countries={countries} />}
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

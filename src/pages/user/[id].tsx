import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMeQuery, User, useUserQuery } from 'generated/graphql';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { generateAvatarURl } from '@modules/core/user/user';
import withApollo from '@modules/core/apollo/apollo';

import axios from 'axios';
import LayoutCore from 'layouts/core/components/layout-core';
const UserProfile = dynamic(() => import('@components/user/profile/page/user/user-profile'));

export type CountryEntry = {
  name?: string;
  flag?: string;
};

interface UserPageProps {
  /** Countries data */
  countries: CountryEntry[];
}

const UserPage: React.FC<UserPageProps> = ({ countries }) => {
  const router = useRouter();
  const [IDFromRoute, _setIDFromRoute] = useState(router.query.id as string);
  const [userOwnsPage, setUserOwnsPage] = useState(false);
  const { data: userData, loading } = useMeQuery({
    ssr: true,
  });

  const { data: targetUser, loading: targetUserLoading } = useUserQuery({
    skip: IDFromRoute === '',
    variables: {
      where: {
        username: IDFromRoute,
      },
    },
  });

  useEffect(() => {
    /** Check if the current logged user matches the target user. */
    const userOwnsPage = (): boolean => {
      if (userData?.me?.user && targetUser?.user?.user) {
        return userData.me.user.id === targetUser.user.user.id;
      }
      return false;
    };
    setUserOwnsPage(userOwnsPage());
  }, [targetUser?.user, userData?.me]);

  return (
    <LayoutCore
      user={userData?.me?.user}
      headProps={{
        seoTitle: `${targetUser?.user?.user?.username ?? IDFromRoute} | Mecha Type`,
        seoDescription: `${
          targetUser?.user?.user?.username ?? IDFromRoute
        }´s profile page, showing their stats and more information.`,
        seoUrl: `${__URI__!}/user/${targetUser?.user?.user?.username}`,
        seoImage: generateAvatarURl(targetUser?.user?.user!),
      }}
    >
      <UserProfile
        user={userData?.me.user as User}
        targetUser={targetUser?.user.user as User}
        loading={loading && targetUserLoading && loading}
        ownsPage={userOwnsPage}
        countries={countries}
      />
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

export default withApollo({})(UserPage);

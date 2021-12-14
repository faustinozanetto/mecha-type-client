import React, { useEffect, useState } from 'react';
import UserProfile from '@components/user/profile/page/user/user-profile';
import axios from 'axios';
import LayoutCore from 'layouts/core/components/layout-core';
import { withApollo } from '@modules/core/apollo/apollo';
import { useMeQuery, UserFragment, useUserQuery } from 'generated/graphql';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { generateAvatarURl } from '@modules/core/user/user';
import { CountryEntry } from '@typings/user.types';
import { isReturnStatement } from 'typescript';

interface UserPageProps {
  /** Countries data */
  countries: CountryEntry[];
  /** Data containing the user info of the current logged in user. */
  me: UserFragment;
}

const UserPage: React.FC<UserPageProps> = ({ countries, me }) => {
  const router = useRouter();

  const [targetUser, setTargetUser] = useState<UserFragment>();
  const [IDFromRoute, _setIDFromRoute] = useState(router.query.name as string);
  const [userOwnsPage, setUserOwnsPage] = useState(false);

  const { data: targetUserData, loading: targetUserLoading } = useUserQuery({
    variables: {
      where: {
        username: IDFromRoute,
      },
    },
  });

  // Target User
  useEffect(() => {
    if (targetUserData?.user?.user) {
      setTargetUser(targetUserData?.user?.user);
    }
  }, [targetUserData, targetUserLoading]);

  /** Check if the current logged user matches the target user. */
  useEffect(() => {
    if (me && targetUser) {
      setUserOwnsPage(me.username === IDFromRoute);
    }
  }, [targetUser, IDFromRoute, me]);

  return (
    <LayoutCore
      user={me}
      headProps={{
        seoTitle: `${targetUser?.username ?? IDFromRoute} | Mecha Type`,
        seoDescription: `${
          targetUser?.username ?? IDFromRoute
        }´s profile page, showing their stats and more information.`,
        seoUrl: `${__URI__!}/user/${targetUser?.username}`,
        seoImage: generateAvatarURl(targetUser),
      }}
    >
      {targetUser && (
        <UserProfile
          user={me}
          targetUser={targetUser}
          loading={targetUserLoading}
          ownsPage={userOwnsPage}
          countries={countries}
        />
      )}
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  let names: CountryEntry[] = [];
  type AxiosResponse = {
    data: CountryEntry[];
  };

  try {
    const res = await axios.get<AxiosResponse>('https://countriesnow.space/api/v0.1/countries/flag/images');
    const data = await res.data;
    data.data.map((country: any) => {
      names.push({ name: country.name, flag: country.flag });
    });
  } catch (e) {}

  return {
    props: { countries: names ?? [], ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])) },
  };
};

export default withApollo({})(UserPage);

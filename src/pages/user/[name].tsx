import React, { useEffect, useState } from 'react';
import UserProfile from '@components/user/profile/page/user/user-profile';
import LayoutCore from 'layouts/core/components/core-layout';
import { withApollo } from '@modules/core/apollo/apollo';
import { UserFragment, useUserQuery } from 'generated/graphql';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { generateAvatarURl } from '@modules/core/user/user';
import { CountryEntry } from '@typings/user.types';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';
import useAuth from '@contexts/UserContext';

interface UserPageProps {
  /** Countries data */
  countries: CountryEntry[];
}

const UserPage: React.FC<UserPageProps> = ({ countries }) => {
  const router = useRouter();
  const { user: loggedInUser } = useAuth();
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
    if (loggedInUser && targetUser) {
      setUserOwnsPage(loggedInUser.username === IDFromRoute);
    }
  }, [targetUser, IDFromRoute, loggedInUser]);

  return (
    <LayoutCore
      head={CoreLayoutHead}
      headProps={{
        seoTitle: `${targetUser?.username ?? IDFromRoute} | Mecha Type`,
        seoDescription: `${
          targetUser?.username ?? IDFromRoute
        }´s profile page, showing their stats and more information.`,
        seoUrl: `${__URI__!}/user/${targetUser?.username}`,
        seoCanonicalUrl: `${__URI__!}/user`,
        seoImage: generateAvatarURl(targetUser),
      }}
    >
      {targetUser && (
        <UserProfile
          user={loggedInUser}
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

  await fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) =>
      data.map((country) => {
        names.push({ name: country.name.common, flag: country.flags.svg });
      })
    );

  return {
    props: { countries: names ?? [], ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])) },
  };
};

export default withApollo({})(UserPage);

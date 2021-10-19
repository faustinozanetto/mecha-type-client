import React, { useEffect, useState } from 'react';
import { withApollo } from '@modules/core/apollo/apollo';
import LayoutCore from 'layouts/core/components/layout-core';
import { UserFragment, useUserFollowersQuery, useUserQuery } from 'generated/graphql';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface UserFollowersPageProps {}

const UserFollowersPage: React.FC<UserFollowersPageProps> = ({}) => {
  const { query } = useRouter();
  const [targetUser, setTargetUser] = useState<UserFragment>();
  const { data: userData, loading: userLoading } = useUserQuery({
    variables: {
      where: {
        username: query.name as string,
      },
    },
  });
  const {
    data: followersData,
    loading: followersLoading,
    refetch: followersRefetch,
  } = useUserFollowersQuery({
    variables: {
      input: {
        take: 4,
        skip: 0,
        where: {
          id: targetUser?.id,
        },
      },
    },
  });

  // Target User
  useEffect(() => {
    if (userData?.user?.user && !userLoading) {
      setTargetUser(userData.user.user);
    }
  }, [userData]);

  return (
    <LayoutCore
      user={targetUser}
      headProps={{
        seoTitle: `${targetUser?.username} Followers | Mecha Type`,
        seoDescription: `${targetUser?.username}´s followers page, showing followers and more information.`,
        seoUrl: `${__URI__!}/user/${targetUser?.username}/followers`,
      }}
    >
      <h1>Followers</h1>
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: { ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])) },
  };
};

export default withApollo({})(UserFollowersPage);

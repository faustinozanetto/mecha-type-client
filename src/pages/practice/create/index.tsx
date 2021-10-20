import React, { useEffect, useState } from 'react';
import LayoutCore from 'layouts/core/components/layout-core';
import { withApollo } from '@modules/core/apollo/apollo';
import PresetCreation from '@components/practice/selection/preset-creation/preset-creation';
import { useMeQuery, UserFragment } from '@generated/graphql';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';

interface PracticePageProps {}

const PracticePage: React.FC<PracticePageProps> = () => {
  const [me, setMe] = useState<UserFragment>();
  const { data: meUserData, loading: meLoading } = useMeQuery({});

  // Me data
  useEffect(() => {
    if (meUserData?.me?.user && !meLoading) {
      setMe(meUserData.me.user);
    }
  }, [meUserData]);

  return (
    <LayoutCore
      user={me}
      headProps={{
        seoTitle: 'Preset Creation | Mecha Type',
        seoDescription: 'Create your own custom Practice Preset and share it to the community.',
        seoUrl: `${__URI__}/practice/create`,
      }}
    >
      {me && <PresetCreation user={me} onCreatedCallback={() => {}} />}
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(PracticePage);

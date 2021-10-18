import React from 'react';
import LayoutCore from 'layouts/core/components/layout-core';
import { withApollo } from '@modules/core/apollo/apollo';
import PresetCreation from '@components/practice/selection/preset-creation/preset-creation';
import { useMeQuery } from '@generated/graphql';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';

interface PracticePageProps {}

const PracticePage: React.FC<PracticePageProps> = () => {
  const { data: userData } = useMeQuery({});

  return (
    <LayoutCore
      user={userData?.me?.user!}
      headProps={{
        seoTitle: 'Preset Creation | Mecha Type',
        seoDescription: 'Create your own custom Practice Preset and share it to the community.',
        seoUrl: `${__URI__}/practice/create`,
      }}
    >
      <PresetCreation user={userData?.me?.user} onCreatedCallback={() => {}} />
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(PracticePage);

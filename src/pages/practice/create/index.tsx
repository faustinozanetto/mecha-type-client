import React from 'react';
import LayoutCore from 'layouts/core/components/core-layout';
import { withApollo } from '@modules/core/apollo/apollo';
import PresetCreation from '@components/practice/selection/preset-creation/preset-creation';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';
import useAuth from '@contexts/UserContext';

interface PracticePageProps {}

const PracticePage: React.FC<PracticePageProps> = ({}) => {
  const { user } = useAuth();
  return (
    <LayoutCore
      head={CoreLayoutHead}
      headProps={{
        seoTitle: 'Preset Creation | Mecha Type',
        seoDescription: 'Create your own custom Practice Preset and share it to the community.',
        seoUrl: `${__URI__}/practice/create`,
        seoCanonicalUrl: `${__URI__}/practice/create`,
      }}
    >
      {user && <PresetCreation onCreatedCallback={() => {}} />}
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(PracticePage);

import React from 'react';
import LayoutCore from 'layouts/core/components/core-layout';
import PresetCreation from '@components/practice/selection/preset-creation/preset-creation';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import useAuth from '@contexts/UserContext';

interface PracticePageProps {}

const PracticePage: React.FC<PracticePageProps> = ({}) => {
  const { user } = useAuth();
  return (
    <LayoutCore
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

export default PracticePage;

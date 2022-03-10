import React from 'react';
import { PracticePresetSelection } from '@components/practice/selection';
import { __PROD__, __URI__ } from '@utils/constants';
import LayoutCore from 'layouts/core/components/core-layout';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';
import GoogleAds from '@components/google/google-ads';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface PracticePageProps {
  date: string;
}

const PracticePage: React.FC<PracticePageProps> = ({ date }) => {
  return (
    <LayoutCore
      head={CoreLayoutHead}
      headProps={{
        seoTitle: 'Practice | Mecha Type',
        seoDescription: 'Practice page where you can choose to use a created preset, or create one.',
        seoUrl: `${__URI__}/practice`,
        seoCanonicalUrl: `${__URI__}/practice`,
      }}
    >
      <h1>created on {date}</h1>
      <PracticePresetSelection />
      <GoogleAds />
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])),
      date: new Date().toTimeString(),
    },
    revalidate: 5,
  };
};

export default PracticePage;

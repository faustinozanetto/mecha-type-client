import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import LayoutCore from 'layouts/core/components/layout-core';

interface AboutPageProps {}

const AboutPage: React.FC<AboutPageProps> = ({}) => {
  return (
    <LayoutCore
      headProps={{
        seoTitle: 'About | Mecha Type',
        seoDescription: 'About page.',
        seoUrl: `${__URI__}/about`,
      }}
    >
      <h1>About</h1>
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default AboutPage;

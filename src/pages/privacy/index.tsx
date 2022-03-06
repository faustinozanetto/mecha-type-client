import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import LayoutCore from 'layouts/core/components/core-layout';
import LandingLayoutHead from 'layouts/landing/components/landing-layout-head';
import LandingLayout from 'layouts/landing/components/landing-layout';

interface PrivacyPageProps {}

const PrivacyPage: React.FC<PrivacyPageProps> = ({}) => {
  return (
    <LandingLayout
      head={LandingLayoutHead}
      headProps={{
        seoTitle: 'Privacy | Mecha Type',
        seoDescription: 'Privacy page showing the data we collect and other important information of Mecha Type.',
        seoUrl: __URI__ + '/privacy',
        seoCanonicalUrl: __URI__ + '/privacy',
      }}
    >
      <h1>Privacy</h1>
    </LandingLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default PrivacyPage;

import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { __URI__ } from '@utils/constants';

import LandingLayout from 'layouts/landing/components/landing-layout';
import LandingLayoutHead from 'layouts/landing/components/landing-layout-head';
import ErrorDetails from '@components/errors/error-details';

interface ErrorPageProps {
  locale: string;
  statusCode: number;
}

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const { statusCode } = props;
  return (
    <LandingLayout
      head={LandingLayoutHead}
      headProps={{
        seoTitle: 'Error | Mecha Type',
        seoDescription: 'Homepage for Mecha Type, usually shows information about updates and news.',
        seoUrl: __URI__,
        seoCanonicalUrl: __URI__,
      }}
    >
      <ErrorDetails statusCode={statusCode} />
    </LandingLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default ErrorPage;

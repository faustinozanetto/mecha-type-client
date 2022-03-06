import React from 'react';
import { UserFragment } from '@generated/graphql';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import LayoutCore from 'layouts/core/components/core-layout';
import { withApollo } from '@modules/core/apollo/apollo';
import { UserDashboard } from '@components/dashboard';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  return (
    <LayoutCore
      head={CoreLayoutHead}
      headProps={{
        seoTitle: 'Dashboard | Mecha Type',
        seoDescription: 'Dashboard page where you can see your progress and more precise information.',
        seoUrl: `${__URI__}/dashboard`,
        seoCanonicalUrl: `${__URI__}/dashboard`,
      }}
    >
      <UserDashboard />
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(DashboardPage);

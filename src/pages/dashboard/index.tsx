import React from 'react';
import { UserFragment } from '@generated/graphql';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import LayoutCore from 'layouts/core/components/layout-core';
import { withApollo } from '@modules/core/apollo/apollo';
import { UserDashboard } from '@components/dashboard';

interface DashboardPageProps {
  /** Data containing the user info of the current logged in user. */
  me: UserFragment;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ me }) => {
  return (
    <LayoutCore
      user={me}
      headProps={{
        seoTitle: 'Dashboard | Mecha Type',
        seoDescription: 'Dashboard page where you can see your progress and more precise information.',
        seoUrl: `${__URI__}/practice`,
      }}
    >
      {me && <UserDashboard user={me} />}
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(DashboardPage);

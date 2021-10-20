import React, { useEffect, useState } from 'react';
import { useMeQuery, UserFragment } from 'generated/graphql';
import { GetStaticProps } from 'next';
import { LeaderboardsDashboard } from '@components/leaderboards/leaderboards-dashboard';
import { __URI__ } from '@utils/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withApollo } from '@modules/core/apollo/apollo';
import LayoutCore from 'layouts/core/components/layout-core';

interface LeaderboardsPageProps {
  locale: string;
}

const LeaderboardsPage: React.FC<LeaderboardsPageProps> = ({ locale }) => {
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
        seoTitle: 'Leaderboards | Mecha Type',
        seoDescription: 'Leaderboards of Mecha Type, see who is the best at typing!',
        seoUrl: `${__URI__}/leaderboards`,
      }}
    >
      <LeaderboardsDashboard />
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['sidebar'])) } };
};

export default withApollo({})(LeaderboardsPage);

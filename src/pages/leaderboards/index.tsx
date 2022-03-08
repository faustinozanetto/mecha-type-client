import React from 'react';
import { GetStaticProps } from 'next';
import { LeaderboardsDashboard } from '@components/leaderboards/leaderboards-dashboard';
import { __URI__ } from '@utils/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LayoutCore from 'layouts/core/components/core-layout';
import { Flex } from '@chakra-ui/react';

interface LeaderboardsPageProps {}

const LeaderboardsPage: React.FC<LeaderboardsPageProps> = ({}) => {
  return (
    <LayoutCore
      headProps={{
        seoTitle: 'Leaderboards | Mecha Type',
        seoDescription: 'Leaderboards of Mecha Type, see who is the best at typing!',
        seoUrl: `${__URI__}/leaderboards`,
        seoCanonicalUrl: `${__URI__}/leaderboards`,
      }}
    >
      <Flex flexDir="column" maxWidth={['xl', '2xl', '3xl', '4xl']}>
        <LeaderboardsDashboard />
      </Flex>
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['sidebar'])) } };
};

export default LeaderboardsPage;

import React from 'react';
import { PracticePresetSelection } from '@components/practice/selection';
import { useMeQuery } from '@generated/graphql';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import LayoutCore from 'layouts/core/components/layout-core';
import withApollo from '@modules/core/apollo/apollo';

import Footer from '@components/footer/footer';
import Sidebar from '@components/sidebar/sidebar';

interface PracticePageProps {}

const PracticePage: React.FC<PracticePageProps> = () => {
  const { data: userData } = useMeQuery({});

  return (
    <LayoutCore
      Footer={Footer}
      Sidebar={Sidebar}
      sidebarProps={{ user: userData?.me?.user! }}
      headProps={{
        seoTitle: 'Practice | Mecha Type',
        seoDescription: 'Practice page where you can choose to use a created preset, or create one.',
        seoUrl: `${__URI__}/practice`,
      }}
    >
      <PracticePresetSelection user={userData?.me?.user!} />
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(PracticePage);

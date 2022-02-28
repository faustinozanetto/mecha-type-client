import React from 'react';
import { PracticePresetSelection } from '@components/practice/selection';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import LayoutCore from 'layouts/core/components/core-layout';
import { withApollo } from '@modules/core/apollo/apollo';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';

interface PracticePageProps {}

const PracticePage: React.FC<PracticePageProps> = ({}) => {
  return (
    <LayoutCore
      head={CoreLayoutHead}
      headProps={{
        seoTitle: 'Practice | Mecha Type',
        seoDescription: 'Practice page where you can choose to use a created preset, or create one.',
        seoUrl: `${__URI__}/practice`,
      }}
    >
      <PracticePresetSelection />
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({ ssr: false })(PracticePage);

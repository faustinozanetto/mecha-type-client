import React, { useEffect, useState } from 'react';
import { PracticePresetSelection } from '@components/practice/selection';
import { useMeQuery, UserFragment } from '@generated/graphql';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import LayoutCore from 'layouts/core/components/layout-core';
import { withApollo } from '@modules/core/apollo/apollo';

interface PracticePageProps {}

const PracticePage: React.FC<PracticePageProps> = () => {
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
        seoTitle: 'Practice | Mecha Type',
        seoDescription: 'Practice page where you can choose to use a created preset, or create one.',
        seoUrl: `${__URI__}/practice`,
      }}
    >
      {me && <PracticePresetSelection user={me} />}
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({ ssr: false })(PracticePage);

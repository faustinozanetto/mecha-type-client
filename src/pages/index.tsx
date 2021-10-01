import React from 'react';
import LayoutCore from 'layouts/core/components/layout-core';
import Footer from '@components/footer/footer';
import Sidebar from '@components/sidebar/sidebar';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import withApollo from '@modules/core/apollo/apollo';
import { Heading } from '@chakra-ui/react';
import { __URI__ } from '@utils/constants';
import { useMeQuery } from '@generated/graphql';
import { Loading } from '@components/loading/loading';
import { Adsense } from '@ctrl/react-adsense';
import GoogleAdsense from 'next-google-ads';
import AdBanner from '@components/AdBanner';

interface IHomeProps {
  locale: string;
}

const Home: React.FC<IHomeProps> = () => {
  const { t } = useTranslation('common');

  const { data: userData, loading } = useMeQuery({
    ssr: true,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <LayoutCore
      Footer={Footer}
      Sidebar={Sidebar}
      sidebarProps={{ user: userData?.me?.user! }}
      headProps={{
        seoTitle: 'Home | Mecha Type',
        seoDescription: 'Homepage for Mecha Type, usually shows information about updates and news.',
        seoUrl: __URI__,
      }}
    >
      <Heading as="h1" fontWeight={700}>
        Welcome to Mecha Type
      </Heading>
      <Heading as="h2" fontSize="2xl">
        {t('test')}
      </Heading>
      <Heading as="h3">v0.0.5</Heading>
      {/* <GoogleAdsense client="ca-pub-8808387532349652" slot="5518576177" responsive="true" /> */}
      <AdBanner />
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(Home);

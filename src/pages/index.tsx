import React from 'react';
import LayoutCore from 'layouts/core/components/layout-core';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { withApollo } from '@modules/core/apollo/apollo';
import { Heading } from '@chakra-ui/react';
import { __URI__ } from '@utils/constants';
import { useMeQuery } from '@generated/graphql';
import GoogleAdsense, { GoogleAdsenseWidget } from 'next-google-ads';
import Script from 'next/script';

interface IHomeProps {
  locale: string;
}

const Home: React.FC<IHomeProps> = () => {
  const { t } = useTranslation('common');

  const { data: userData } = useMeQuery({
    ssr: true,
  });

  return (
    <LayoutCore
      user={userData?.me?.user}
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
      <Heading as="h3">v0.1.5</Heading>
      <Script
        id="google-adsense"
        src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client="ca-pub-8808387532349652"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            window.onload = () => {
              ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            };
          }
        }}
      />
      <GoogleAdsenseWidget client="ca-pub-8808387532349652" slot="99999999" responsive="true" />
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(Home);

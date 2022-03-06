import React from 'react';
import LayoutCore from 'layouts/core/components/core-layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { withApollo } from '@modules/core/apollo/apollo';
import { Heading } from '@chakra-ui/react';
import { __URI__ } from '@utils/constants';

import CoreLayoutHead from 'layouts/core/components/core-layout-head';
import LandingLayout from 'layouts/landing/components/landing-layout';
import LandingLayoutHead from 'layouts/landing/components/landing-layout-head';
import LandingHero from '@components/landing/hero/lading-hero';
import LandingFeatures from '@components/landing/features/landing-features';
import LandingStats from '@components/landing/stats/lading-stats';

interface IHomeProps {
  locale: string;
}

const Home: React.FC<IHomeProps> = ({}) => {
  const { t } = useTranslation('common');

  return (
    <LandingLayout
      head={LandingLayoutHead}
      headProps={{
        seoTitle: 'Home | Mecha Type',
        seoDescription: 'Homepage for Mecha Type, usually shows information about updates and news.',
        seoUrl: __URI__,
        seoCanonicalUrl: __URI__,
      }}
    >
      {/* Hero */}
      <LandingHero />
      {/* Features */}
      <LandingFeatures />
      {/* Statistics */}
      <LandingStats />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE as string}
        data-ad-slot="5518576177"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </LandingLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(Home);

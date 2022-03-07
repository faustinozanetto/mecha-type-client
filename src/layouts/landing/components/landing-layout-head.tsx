import React from 'react';
import NextHead from 'next/head';
import { __URI__ } from '@utils/constants';
import { SUPPORTED_LOCALES } from '@modules/core/i18n/i18n';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

export interface LandingLayoutHeadProps {
  seoTitle?: string;
  seoDescription?: string;
  seoUrl?: string;
  seoCanonicalUrl?: string;
  seoFavIcon?: string;
  seoImage?: string;
}

const LandingLayoutHead: React.FC<LandingLayoutHeadProps> = (props): JSX.Element => {
  const {
    seoTitle,
    seoUrl,
    seoCanonicalUrl,
    seoImage = '/images/icons/mecha-type-icon512x512.png',
    seoDescription,
    seoFavIcon = '/images/icons/mecha-type-icon256x256.png',
  } = props;
  const router = useRouter();

  return (
    <NextSeo
      title={seoTitle}
      description={seoDescription}
      canonical={seoCanonicalUrl}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: seoFavIcon,
          type: 'image/png',
          sizes: '256x256',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ]}
      openGraph={{ url: seoUrl, description: seoDescription }}
    />
  );
};

export default LandingLayoutHead;

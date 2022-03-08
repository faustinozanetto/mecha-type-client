import React from 'react';
import Head from 'next/head';
import { __URI__ } from '@utils/constants';
import { SUPPORTED_LOCALES } from '@modules/core/i18n/i18n';
import { useRouter } from 'next/router';

export interface CoreLayoutHeadProps {
  seoTitle?: string;
  seoDescription?: string;
  seoUrl?: string;
  seoCanonicalUrl?: string;
  seoFavIcon?: string;
  seoImage?: string;
}

const CoreLayoutHead: React.FC<CoreLayoutHeadProps> = (props): JSX.Element => {
  const {
    seoTitle,
    seoUrl,
    seoCanonicalUrl,
    seoImage = 'https://www.1zoom.me/prev/323/322504.jpg',
    seoDescription,
    seoFavIcon = '/images/icons/mecha-type-icon256x256.png',
  } = props;
  const router = useRouter();

  return (
    <Head>
      <title>{seoTitle}</title>
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      {/* Base */}
      <meta charSet="UTF-8" />
      <meta name="robots" content="index" />
      <meta name="description" content={seoDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" sizes="256x256" href={seoFavIcon} />
      <link rel="canonical" href={seoCanonicalUrl} />

      {/* Languages */}
      {SUPPORTED_LOCALES.map((locale) => {
        return (
          <link
            key={locale.name}
            rel="alternate"
            hrefLang={locale?.lang || 'en'}
            href={`${__URI__}/ ${locale?.lang || 'en'}`}
          />
        );
      })}

      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:locale" content={router.locale} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MechaType" />
      {/* Twitter */}
      <meta name="twitter:site" content={seoUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:creator" content="@mechatype" />
    </Head>
  );
};

export default CoreLayoutHead;

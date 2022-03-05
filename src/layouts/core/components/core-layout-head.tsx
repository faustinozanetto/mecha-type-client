import React from 'react';
import NextHead from 'next/head';
import { __URI__ } from '@utils/constants';
import { SUPPORTED_LOCALES } from '@modules/core/i18n/i18n';

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
    seoImage,
    seoDescription,
    seoFavIcon = '/images/icons/mecha-type-icon256x256.png',
  } = props;

  return (
    <NextHead>
      <title>{seoTitle}</title>
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      {/* Base */}
      <meta charSet="UTF-8" />
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

      {/* Open-graph */}
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* Twitter */}
      <meta name="twitter:site" content={seoUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={seoImage} />
    </NextHead>
  );
};

export default CoreLayoutHead;

import React from 'react';
import NextHead from 'next/head';
import { SUPPORTED_LOCALES } from '@modules/core/i18n/i18n';
import { fontConfigurations, fontsBasePath } from '@modules/core/fonts/fonts';
import { __URI__ } from '@utils/constants';

export interface LayoutCoreHeadProps {
  /**
   * Title of the page. (SEO)
   *
   * Displayed in the browser tab.
   */
  seoTitle?: string;
  /**
   * Description of the page. (SEO)
   *
   * Used as Open Graph and twitter description.
   */
  seoDescription?: string;
  /**
   * Url of the page. (SEO)
   *
   * Used as Open Graph url.
   */
  seoUrl?: string;
  seoCanonicalUrl?: string;
  /**
   * Favicon.
   *
   * Websites usually use the same favicon for all their pages.
   */
  seoFavIcon?: string;
  /**
   * Image associated with the page. (SEO)
   *
   * Used as Open Graph and twitter image.
   */
  seoImage?: string;
}

const LayoutCoreHead: React.FC<LayoutCoreHeadProps> = (props): JSX.Element => {
  const {
    seoTitle,
    seoUrl,
    seoCanonicalUrl,
    seoImage,
    seoDescription,
    seoFavIcon = 'static/images/icons/mecha-type-icon.png',
  } = props;

  return (
    <NextHead>
      {/* Base */}
      <meta charSet="UTF-8" />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href={seoFavIcon} />
      <link rel="canonical" href={seoCanonicalUrl} />

      {/* Preload the font */}
      {fontConfigurations
        .find((font) => font.fontName === 'Poppins')
        .fontWeights.map((weight) => {
          return (
            <link
              key={`font-${weight}`}
              rel="preload"
              href={`${fontsBasePath}/Poppins/poppins-latin-${weight}.woff2`}
              as="font"
              type={`font/woff2`}
              crossOrigin="anonymous"
            />
          );
        })}

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
      <meta property="og:image" content={seoFavIcon} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* Twitter */}
      <meta name="twitter:site" content={seoUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={seoFavIcon} />
    </NextHead>
  );
};

export default LayoutCoreHead;

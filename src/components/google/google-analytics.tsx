import React from 'react';
import Script from 'next/script';
import { GA_TRACKING_ID } from '@modules/core/adsense/google-tag';

interface GoogleAnalyticsProps {}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({}) => {
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

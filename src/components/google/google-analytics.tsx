import Script from 'next/script';
import React from 'react';

interface GoogleAnalyticsProps {}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({}) => {
  return (
    <>
      {process.env.GOOGLE_ANALYTICS_ID && (
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`} />
      )}
      {process.env.GOOGLE_ANALYTICS_ID && (
        <Script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      )}
    </>
  );
};

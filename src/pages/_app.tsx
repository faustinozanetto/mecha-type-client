import React, { useEffect } from 'react';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@styles/global-styles';
import { useRouter } from 'next/router';
import * as gtag from '@lib/google/gtag';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8808387532349652"
        crossOrigin="anonymous"
      />
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <GlobalStyles />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default appWithTranslation(MechaApp);

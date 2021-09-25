import Script from 'next/script';
import React from 'react';

const AdSenseConnection: React.FC<{}> = (): JSX.Element => {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8808387532349652"
      crossOrigin="anonymous"
    />
  );
};
export default AdSenseConnection;

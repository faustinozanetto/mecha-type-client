import React, { useEffect } from 'react';

interface GoogleAdsProps {}

const GoogleAds: React.FC<GoogleAdsProps> = ({}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: 'block',
      }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE as string}
      data-ad-slot="5518576177"
    />
  );
};

export default GoogleAds;

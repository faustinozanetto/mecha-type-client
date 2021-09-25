import React, { useEffect } from 'react';

const AdBanner = () => {
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
      data-ad-client="ca-pub-8808387532349652"
      data-ad-slot="5518576177"
    />
  );
};

export default AdBanner;

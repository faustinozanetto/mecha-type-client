import React from 'react';
import type { AppProps } from 'next/app';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

export default MechaApp;

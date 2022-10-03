import '../styles/globals.css';

import type { AppProps } from 'next/app';
import React from 'react';

const MechaApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

export default MechaApp;

const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer');
const { i18n } = require('./next-i18next.config');

const withBundleAnalyzer = bundleAnalyzer({
  // Run with "yarn analyse:bundle" - See https://www.npmjs.com/package/@next/bundle-analyzer
  enabled: process.env.ANALYZE_BUNDLE === 'true',
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  i18n,
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  images: {
    domains: [
      'unsplash.com',
      'images.unsplash.com',
      'www.w3bai.com',
      'cdn.discordapp.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'media.4rgos.it',
      'restcountries.eu',
      'https://images.unsplash.com',
      'imgur.com',
      'i.imgur.com',
    ],
  },
};

module.exports = withPlugins([withBundleAnalyzer({})], nextConfig);

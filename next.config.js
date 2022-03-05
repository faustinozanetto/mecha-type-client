const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer');
const { i18n } = require('./next-i18next.config');
const nextSourceMaps = require('@zeit/next-source-maps');

const withBundleAnalyzer = bundleAnalyzer({
  // Run with "yarn analyse:bundle" - See https://www.npmjs.com/package/@next/bundle-analyzer
  enabled: process.env.ANALYZE_BUNDLE === 'true',
});

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  i18n,
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

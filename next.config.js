const withPlugins = require('next-compose-plugins');
const { i18n } = require('./next-i18next.config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
  webpack5: true,
  trailingSlash: false,
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

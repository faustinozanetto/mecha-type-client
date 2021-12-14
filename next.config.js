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
  // See https://nextjs.org/docs/messages/webpack5
  // Necessary to manually specify to use webpack 5, because we use a custom "webpack" config (see below)
  webpack5: true,
  /**
   * The webpack function is executed twice, once for the server and once for the client.
   * This allows you to distinguish between client and server configuration using the isServer property.
   *
   * @param config Current webpack config. Useful to reuse parts of what's already configured while overridding other parts.
   * @param buildId The build id, used as a unique identifier between builds.
   * @param dev Indicates if the compilation will be done in development.
   * @param isServer It's true for server-side compilation, and false for client-side compilation.
   * @param defaultLoaders Default loaders used internally by Next.js:
   *  - babel Default babel-loader configuration
   * @see https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
   */
  experimental: {
    esmExternals: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    if (isServer) {
      /**
       * This special server-only environment variable isn't string-replaced by webpack during bundling (it isn't added to the DefinePlugin definitions).
       *
       * Therefore, it's:
       * - Always '1' on the server, during development
       * - Always '1' on the server, during the Next.js build step
       * - Always undefined on the browser
       * - Always undefined in API endpoints
       * - Always undefined during static pages re-generations (ISG) and server-side pages
       *
       * It can be useful when performing processing that should only happen during the initial build, or not during the initial build.
       */
      process.env.IS_SERVER_INITIAL_BUILD = '1';
    }

    const APP_VERSION_RELEASE = APP_RELEASE_TAG || buildId;
    config.plugins.map((plugin, i) => {
      // Inject custom environment variables in "DefinePlugin" - See https://webpack.js.org/plugins/define-plugin/
      if (plugin.__proto__.constructor.name === 'DefinePlugin') {
        // Dynamically add some "public env" variables that will be replaced during the build through "DefinePlugin"
        // Those variables are considered public because they are available at build time and at run time (they'll be replaced during initial build, by their value)
        plugin.definitions['process.env.NEXT_PUBLIC_APP_BUILD_ID'] = JSON.stringify(buildId);
        plugin.definitions['process.env.NEXT_PUBLIC_APP_VERSION_RELEASE'] = JSON.stringify(APP_VERSION_RELEASE);
      }
    });
  },
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

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  eslint: {
    dirs: ['.'],
  },
  images: {
    domains: [],
  },
  swcMinify: true,
  poweredByHeader: false,
  trailingSlash: true,
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
};

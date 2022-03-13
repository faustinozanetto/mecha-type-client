/** @type {import('next-sitemap').IConfig} */

const URI = process.env.NODE_ENV === 'production' ? 'https://mechatype.vercel.app' : 'http://localhost:3000';

module.exports = {
  siteUrl: URI,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${URI}/sitemap.xml`, `${URI}/server-sitemap.xml`],
  },
};

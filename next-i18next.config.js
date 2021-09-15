const path = require('path');
path.resolve('./public/static/locales');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localePath: path.resolve('./public/static/locales'),
  },
};

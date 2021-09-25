import { IncomingMessage, ServerResponse } from 'http';
import { Cookies } from './types/cookies.types';
import ServerCookies, { GetOption, SetOption } from 'cookies';
import BrowserCookies, { CookieAttributes } from 'js-cookie';
import { addYears } from '../date/date';
import { __BROWSER__ } from '@utils/constants';

export const USER_LS_KEY = 'user';

/**
 * Helper to manage cookies universally whether being on the server or browser
 *
 * Switches between BrowserCookies and ServerCookies depending on the runtime engine
 * Those two APIs being different (different projects), it deals with those differences, so that they're hidden away when using the helper
 *
 * XXX Do not try to pass down an instance of UniversalCookiesManager to Next.js "pageProps", or it'll throw a circular dependencies
 *  Instead, better instantiate a new UniversalCookiesManager when needed (without req/res if outside of "getInitialProps")
 */
export default class UniversalCookiesManager {
  private readonly req?: IncomingMessage;
  private readonly res?: ServerResponse;
  private readonly readonlyCookies?: Cookies;
  private readonly defaultServerOptions: SetOption = {
    // See https://www.npmjs.com/package/cookies#cookiesset-name--value---options--
    httpOnly: false, // Force cookies to be sent to the browser
    expires: addYears(new Date(), 10), // Force cookies to expire in 10 years
  };
  private readonly defaultBrowserOptions: CookieAttributes = {
    // See https://github.com/js-cookie/js-cookie#cookie-attributes
    expires: 365 * 10, // Force cookies to expire in 10 years
  };

  /**
   * Universal Cookie Manager constructor
   *
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {Cookies} readonlyCookies - Useful if req/res aren't accessible (CSR, or SSR outside of _app), will allow to read cookie (but won't allow writes)
   */
  constructor(req?: IncomingMessage, res?: ServerResponse, readonlyCookies?: Cookies) {
    this.req = req || null;
    this.res = res || null;
    this.readonlyCookies = readonlyCookies || null;
  }

  /**
   * Change the language stored in the i18next cookie
   *
   * By default, no language is stored in the cookie and the app relies on the browser's language
   * Once the cookie is set, it'll rely on the cookie instead (through i18next)
   *
   * @param {string} lang
   * @param serverOptions
   */
  setLanguage(lang: string, serverOptions: SetOption = this.defaultServerOptions): void {
    if (__BROWSER__) {
      BrowserCookies.set('i18n', lang);
    } else {
      const serverCookies = new ServerCookies(this.req, this.res);
      serverCookies.set('i18n', lang, serverOptions);
    }
  }
}

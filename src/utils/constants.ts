/**
 * @returns true if app is in production or false if in development.
 */
export const __PROD__: boolean = process.env.NODE_ENV === 'production';

/**
 * @returns Backend URI used in Apollo Client
 */
export const __BACKEND__: string = __PROD__
  ? 'https://mecha-type-api.herokuapp.com/mecha-api'
  : 'http://localhost:4000/mecha-api';

/**
 * @returns the uri of the web app.
 */
export const __URI__: string = __PROD__ ? 'https://mecha-type.vercel.app' : 'http://localhost:3000';

/**
 * @returns wether it is a server or not.
 */
export const __SERVER__: boolean = typeof window === 'undefined';

/**
 * @returns the access token to perform admin-only actions.
 */
export const __ADMIN_TOKEN__: string = process.env.ADMIN_TOKEN as string;

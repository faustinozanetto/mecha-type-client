import { I18nLocale } from 'app/types/locales.types';
import { createLogger } from '../logging/mecha-logger';

const fileLabel = 'modules/core/i18n/i18n';
const logger = createLogger({
  fileLabel,
});

export const SUPPORTED_LOCALES: I18nLocale[] = [
  {
    name: 'en-US',
    lang: 'en',
  },
  {
    name: 'es-AR',
    lang: 'es',
  },
];
export const SUPPORTED_LANGUAGES: string[] = ['en', 'es'];

/**
 * Language used by default if no user language can be resolved.
 * Defaults to en-US
 * @type {string}
 */
export const DEFAULT_LOCALE: string = 'en';

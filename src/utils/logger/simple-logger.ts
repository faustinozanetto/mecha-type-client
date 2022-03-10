import chalk from 'chalk';
import noop from 'lodash.noop';

export type SimpleLogger = Console;
export type PrintMode = 'debug' | 'error' | 'group' | 'groupEnd' | 'info' | 'log' | 'warn';

interface SimpleLoggerOptions {
  prefix?: string;
  disableAutoWrapPrefix?: boolean;
  colorize?: Colorize;
  shouldPrint?: ShouldPrint;
  shouldShowTime?: ShouldShowTime;
  timeFormat?: TimeFormat;
}

export type Colorize = (mode: PrintMode, prefixes: string[]) => string[];
export type ShouldPrint = (mode: PrintMode) => boolean;
export type ShouldShowTime = () => boolean;
export type TimeFormat = () => string;

/**
 * By default, printing is only enabled in non-production environments.
 *
 * This is useful when dealing with multi stages (dev, staging, production) and you want to enable logs on all stages but not for production.
 */
export const shouldPrintFallback: ShouldPrint = (): boolean => {
  return process.env.APP_ENV !== 'production';
};

/**
 * By default, displays the time as a Date ISO string.
 */
export const timeFormatFallback: TimeFormat = () => new Date().toISOString();

/**
 * Colorize output.
 *
 * Only colorize on the server, not on the browser
 * (keep native behavior, to avoid messing with colors and complicated browser API which is different for each browser).
 *
 * @param mode
 * @param prefixes
 */
const colorizeFallback: Colorize = (mode: Omit<PrintMode, 'groupEnd'>, prefixes: string[]): any[] => {
  if (typeof window === 'undefined') {
    const orange = chalk.hex('#FFA500');

    switch (mode) {
      case 'debug':
        return prefixes.map((prefix: string) => chalk.bgYellow(prefix));
      case 'error':
        return prefixes.map((prefix: string) => chalk.bgRed(prefix));
      case 'group':
        return prefixes.map((prefix: string) => chalk.bgGray(prefix));
      case 'info':
        return prefixes.map((prefix: string) => chalk.bgBlue(prefix));
      case 'log':
        return prefixes.map((prefix: string) => chalk.bgGrey(prefix));
      case 'warn':
        return prefixes.map((prefix: string) => orange(prefix));
    }
  }
  return prefixes;
};

/**
 * Creates a logger object containing the same "print" API as the console object.
 *
 * Compatible with server and browser. (universal)
 *
 * @param options
 */
export const createSimpleLogger = (options?: SimpleLoggerOptions): SimpleLogger => {
  const {
    prefix,
    shouldPrint = shouldPrintFallback,
    disableAutoWrapPrefix = false,
    shouldShowTime = true,
    timeFormat = timeFormatFallback,
    colorize = colorizeFallback,
  } = options || {};
  const _prefix: string | undefined = disableAutoWrapPrefix || !prefix?.length ? prefix : `[${prefix}]`;
  const prefixes: string[] = []; // Contains an array of prefixes (tags, time, etc.)

  prefixes.push(timeFormat());

  if (_prefix) {
    prefixes.push(_prefix);
  }

  return {
    ...console, // Provides the same API as the native "console" object, while overwriting a few specific methods below
    debug: shouldPrint('debug') ? console.debug.bind(console, ...colorize('debug', prefixes)) : noop,
    error: shouldPrint('error') ? console.error.bind(console, ...colorize('error', prefixes)) : noop,
    group: shouldPrint('group') ? console.group.bind(console, ...colorize('group', prefixes)) : noop,
    groupEnd: shouldPrint('groupEnd') ? console.groupEnd.bind(console) : noop,
    info: shouldPrint('info') ? console.info.bind(console, ...colorize('info', prefixes)) : noop,
    log: shouldPrint('log') ? console.log.bind(console, ...colorize('log', prefixes)) : noop,
    warn: shouldPrint('warn') ? console.warn.bind(console, ...colorize('warn', prefixes)) : noop,
  };
};

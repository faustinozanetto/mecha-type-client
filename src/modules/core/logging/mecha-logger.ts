import { __PROD__ } from '@utils/constants';
import { createSimpleLogger, SimpleLogger } from '@utils/logger/simple-logger';

export const createLogger = ({ fileLabel }: { fileLabel: string }): SimpleLogger => {
  if (process.env.NODE_ENV === 'test') {
    return global.muteConsole();
  }

  return createSimpleLogger({
    prefix: fileLabel,
    shouldShowTime: () => true,
    shouldPrint: () => {
      return !(__PROD__ && typeof window !== 'undefined');
    },
  });
};

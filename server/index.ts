import next from 'next';
import { createServer } from 'http';
import { createLogger } from '@modules/core/logging/mecha-logger';
import { __PROD__ } from '@utils/constants';

const fileLabel = 'server';
const logger = createLogger({
  fileLabel,
});

(async () => {
  const app = next({
    dev: !__PROD__,
  });
  await app.prepare().then(() => {
    const handle = app.getRequestHandler();
    const srv = createServer(async (req, res) => {
      handle(req, res);
      if (!(req.url.startsWith('/_next') || req.url.startsWith('/__nextjs'))) {
        res.statusCode === 200
          ? logger.debug('ROUTER', `${res.statusCode} ${req.url}`)
          : logger.error('URL', `${res.statusCode} ${req.url}`);
      }
    });
    srv.on('error', (e) => {
      logger.error('SERVER', e);
      process.exit(1);
    });
    srv
      .on('listening', async () => {
        logger.debug('SERVER', `Listening on ${process.env.HOST}:${process.env.PORT}`);
      })
      .listen(process.env.PORT);
  });
  try {
  } catch (e) {
    if (e.message && e.message.startsWith('Could not find a production')) {
      console.log(e.message);
      logger.error('WEB', 'There is no production build - run yarn build');
    } else if (e.code && e.code === 'ENOENT') {
      if (e.path === './.next') {
        logger.error('WEB', 'There is no production build - run yarn build');
      }
    } else {
      logger.error('SERVER', e);
      process.exit(1);
    }
  }
})();

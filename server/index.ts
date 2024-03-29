import next from 'next';
import { createServer } from 'http';
import { __PROD__, __URI__ } from '../src/utils/constants';
import { createLogger } from '../src/modules/core/logging/mecha-logger';

const fileLabel = 'server';
const logger = createLogger({
  fileLabel,
});

(async () => {
  const app = next({
    dev: !__PROD__,
    port: Number(process.env.PORT || 3000),
    hostname: __PROD__ ? __URI__ : 'localhost',
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
        logger.debug('SERVER', `Listening on ${srv.address()}:${process.env.PORT}`);
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

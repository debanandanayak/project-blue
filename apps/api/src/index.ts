import { serve } from '@hono/node-server';
import { createServer } from './modules/app/server'
import { createLogger } from './modules/shared/logger/logger'

const logger = createLogger({ namespace: 'app-server' })

const {app} = await createServer()
const server = serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  ({ port }) => logger.info({ port }, 'Server started'),
);

process.on('SIGINT', async () => {
  server.close();
  process.exit(0);
});
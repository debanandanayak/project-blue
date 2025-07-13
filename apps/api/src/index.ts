import { serve } from '@hono/node-server';
import { env } from 'bun'
import { createServer } from './modules/app/server'
import { createLogger } from './modules/shared/logger/logger'

import { parseConfig } from './modules/config/config'

const logger = createLogger({ namespace: 'app-server' })
const { config } = await parseConfig({ env });
const {app} = await createServer()
const server = serve(
  {
    fetch: app.fetch,
    port: config.server.port,
  },
  ({ port }) => logger.info({ port }, 'Server started'),
);

process.on('SIGINT', async () => {
  server.close();
  process.exit(0);
});
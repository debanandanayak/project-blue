import { env, serve } from 'bun'
import { createServer } from './modules/app/server'
import { parseConfig } from './modules/config/config'
import { createLogger } from './modules/shared/logger/logger'

const logger = createLogger({ namespace: 'app-server' })
const { config } = await parseConfig({ env })
const { app } = await createServer()
const server = serve({
	fetch: app.fetch,
	port: config.server.port,
})

logger.info({ port: server.port }, 'Server started')
process.on('SIGINT', async () => {
	server.stop()
	process.exit(0)
})

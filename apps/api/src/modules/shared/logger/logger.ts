import {
	addLogContext,
	createAsyncContextPlugin,
	wrapWithLoggerContext,
} from '@crowlog/async-context-plugin'
import type { Logger } from '@crowlog/logger'
import { createLoggerFactory } from '@crowlog/logger'

export type { Logger }
export { addLogContext, wrapWithLoggerContext }

export const createLogger = createLoggerFactory({
	plugins: [createAsyncContextPlugin()],
})

import type { DeepPartial } from '@corentinth/chisels'
import { merge } from 'lodash-es'
import { loadDryConfig } from './config'
import type { Config } from './config.types'

export { overrideConfig }

function overrideConfig(config: DeepPartial<Config> | undefined = {}) {
	const { config: defaultConfig } = loadDryConfig()

	return merge({}, defaultConfig, config)
}

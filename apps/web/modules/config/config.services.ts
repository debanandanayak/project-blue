import { apiClient } from '../shared/http/api-client'
import type { RuntimePublicConfig } from './config'

export async function fetchPublicConfig() {
	const { config } = await apiClient<{ config: RuntimePublicConfig }>({
		path: '/api/config',
		method: 'GET',
	})

	return { config }
}

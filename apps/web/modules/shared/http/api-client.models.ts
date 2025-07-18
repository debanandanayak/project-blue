import { get } from 'lodash-es'
import type { FetchError } from 'ofetch'

export function shouldRefreshAuthTokens({
	error,
}: {
	error: FetchError | unknown | undefined
}) {
	if (!error) {
		return false
	}

	return get(error, 'status') === 401
}

export function buildAuthHeader({
	accessToken,
}: {
	accessToken?: string | null | undefined
} = {}): Record<string, string> {
	if (!accessToken) {
		return {}
	}

	return {
		Authorization: `Bearer ${accessToken}`,
	}
}

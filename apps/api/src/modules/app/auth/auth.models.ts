import { uniq } from 'lodash-es';
import type { Config } from '../../config/config.types';
import { createError } from '../../shared/errors/errors';
import type { Context } from '../server.types';

export function getUser({ context }: { context: Context }) {
	const userId = context.get('userId');

	if (!userId) {
		// This should never happen as getUser is called in authenticated routes
		// just for proper type safety
		throw createError({
			message: 'User not found in context',
			code: 'users.not_found',
			statusCode: 403,
			isInternal: true,
		});
	}

	return {
		userId,
	};
}

export function getSession({ context }: { context: Context }) {
	const session = context.get('session');

	return { session };
}

export function getTrustedOrigins({ config }: { config: Config }) {
	const { baseUrl } = config.client;
	const { trustedOrigins } = config.server;

	return {
		trustedOrigins: uniq([baseUrl, ...trustedOrigins]),
	};
}

import { Hono } from 'hono';
import client from '@/src/client';
import { parseConfig } from '../config/config';
import { createLoggerMiddleware } from '../shared/logger/logger.middleware';
import { getAuth } from './auth/auth.services';
import { registerRoutes } from './server.routes';
import type {
	GlobalDependencies,
	ServerInstanceGenerics,
} from './server.types';

async function createGlobalDependencies(
	partialDeps: Partial<GlobalDependencies>,
): Promise<GlobalDependencies> {
	const config = partialDeps.config ?? (await parseConfig()).config;
	const db = partialDeps.db ?? client;
	const auth = partialDeps.auth ?? getAuth({ db, config }).auth;

	return {
		config,
		db,
		auth,
	};
}
export async function createServer(
	initialDeps: Partial<GlobalDependencies> = {},
) {
	const app = new Hono<ServerInstanceGenerics>({ strict: true });
	const dependencies = await createGlobalDependencies(initialDeps);
	app.use(createLoggerMiddleware());
	registerRoutes({
		app,
		...dependencies,
	});
	return {
		app,
	};
}

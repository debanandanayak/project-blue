import { registerConfigRoutes } from '../config/config.routes';
import { registerAuthRoutes } from './auth/auth.routes';
import { registerHealthCheckRoutes } from './health-check/health-chcck.route';
import type { RouteDefinitionContext } from './server.types';

export function registerRoutes(context: RouteDefinitionContext) {
	registerHealthCheckRoutes(context);
	registerAuthRoutes(context);
	registerConfigRoutes(context);
}

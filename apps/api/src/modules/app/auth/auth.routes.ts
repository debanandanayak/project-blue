import type { Context, RouteDefinitionContext } from '../server.types';

export function registerAuthRoutes({
	app,
	auth,
	config,
}: RouteDefinitionContext) {
	app.on(['POST', 'GET'], '/api/auth/*', (context) =>
		auth.handler(context.req.raw),
	);

	app.use('*', async (context: Context, next) => {
		const session = await auth.api.getSession({
			headers: context.req.raw.headers,
		});

		if (session) {
			context.set('userId', session.user.id);
			context.set('session', session.session);
			context.set('authType', 'session');
		}

		return next();
	});
}

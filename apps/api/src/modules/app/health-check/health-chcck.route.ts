import { RouteDefinitionContext } from "../server.types";

export function registerHealthCheckRoutes(context: RouteDefinitionContext) {
    setupPingRoute(context);
}

function setupPingRoute({ app }: RouteDefinitionContext) {
    app.get('/api/ping', context => context.json({ status: 'ok' }));
}
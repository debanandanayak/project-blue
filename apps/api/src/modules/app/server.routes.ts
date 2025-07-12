import { registerHealthCheckRoutes } from "./health-check/health-chcck.route";
import { RouteDefinitionContext } from "./server.types";

export function registerRoutes(context: RouteDefinitionContext) {
    registerHealthCheckRoutes(context);
}
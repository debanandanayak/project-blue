import { Hono } from "hono";
import { ServerInstanceGenerics } from "./server.types";
import { registerRoutes } from "./server.routes";
import { createLoggerMiddleware } from "../shared/logger/logger.middleware";

export async function createServer() {
    const app = new Hono<ServerInstanceGenerics>({ strict: true });
    app.use(createLoggerMiddleware());
    registerRoutes({ app, });
    return {
        app,
    };
}
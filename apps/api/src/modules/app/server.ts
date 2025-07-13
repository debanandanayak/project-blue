import { Hono } from "hono";
import { GlobalDependencies, ServerInstanceGenerics } from "./server.types";
import { registerRoutes } from "./server.routes";
import { createLoggerMiddleware } from "../shared/logger/logger.middleware";
import { parseConfig } from '../config/config'
import client from "@/src/client"
import { getAuth } from './auth/auth.services'
async function createGlobalDependencies(partialDeps: Partial<GlobalDependencies>): Promise<GlobalDependencies> {
  const config = partialDeps.config ?? (await parseConfig()).config;
  const db = partialDeps.db ?? client;
  const auth = partialDeps.auth ?? getAuth({ db, config}).auth;

  return {
    config,
    db,
    auth,
  };
}
export async function createServer(initialDeps: Partial<GlobalDependencies> = {}) {
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
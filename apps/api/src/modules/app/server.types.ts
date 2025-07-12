import type { Context as BaseContext, Hono } from 'hono';

export type ServerInstanceGenerics = {
  Variables: {
    
  };
};

export type Context = BaseContext<ServerInstanceGenerics>;

export type ServerInstance = Hono<ServerInstanceGenerics>;


export type RouteDefinitionContext = { app: ServerInstance };

import type { Context as BaseContext, Hono } from 'hono';
import { Session } from './auth/auth.types'
import type { Auth } from './auth/auth.services';
import type {PrismaClient} from '@prisma/client'
import { Config } from '../config/config.types'

export type ServerInstanceGenerics = {
  Variables: {
    userId: string | null;
    session: Session | null;
    authType: 'session' | 'api-key' | null;
  };
};

export type Context = BaseContext<ServerInstanceGenerics>;

export type ServerInstance = Hono<ServerInstanceGenerics>;
export type GlobalDependencies = {
  config: Config;
  db: PrismaClient;
  auth: Auth;
};

export type RouteDefinitionContext = { app: ServerInstance } & GlobalDependencies;

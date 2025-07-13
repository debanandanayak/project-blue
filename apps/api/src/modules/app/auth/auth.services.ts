import type { Config } from '../../config/config.types';
import { betterAuth } from 'better-auth';
import { genericOAuth } from 'better-auth/plugins';
import { createLogger } from '../../shared/logger/logger';
import { getTrustedOrigins } from './auth.models';
import { prismaAdapter } from 'better-auth/adapters/prisma'
import type { PrismaClient } from '@prisma/client'

export type Auth = ReturnType<typeof getAuth>['auth'];

const logger = createLogger({ namespace: 'auth' });

export function getAuth({
  db,
  config,
}: {
  db: PrismaClient;
  config: Config;
}) {
  const { secret } = config.auth;

  const { trustedOrigins } = getTrustedOrigins({ config });

  const auth = betterAuth({
    secret,
    baseURL: config.server.baseUrl,
    trustedOrigins,
    logger: {
      disabled: false,
      log: (baseLevel, message) => {
        const level = (baseLevel in logger ? baseLevel : 'info') as keyof typeof logger;

        logger[level](message);
      },
    },
    emailAndPassword: {
      enabled: config.auth.providers.email.isEnabled,
      requireEmailVerification: config.auth.isEmailVerificationRequired,
    },
    appName: 'blue',
    account: {
      accountLinking: {
        enabled: true,
      },
    },

    database: prismaAdapter(db,{
      provider:"postgresql",
    }),

    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            logger.info({ userId: user.id }, 'User signed up');
          },
        },
      },
    },
    socialProviders: {
      github: {
        enabled: config.auth.providers.github.isEnabled,
        clientId: config.auth.providers.github.clientId,
        clientSecret: config.auth.providers.github.clientSecret,
        disableSignUp: !config.auth.isRegistrationEnabled,
        disableImplicitSignUp: !config.auth.isRegistrationEnabled,
      },
      google: {
        enabled: config.auth.providers.google.isEnabled,
        clientId: config.auth.providers.google.clientId,
        clientSecret: config.auth.providers.google.clientSecret,
        disableSignUp: !config.auth.isRegistrationEnabled,
        disableImplicitSignUp: !config.auth.isRegistrationEnabled,
      },
    },
    user: {
      changeEmail: { enabled: false },
      deleteUser: { enabled: false },
    },
    plugins: [
      ...(config.auth.providers.customs.length > 0
        ? [genericOAuth({ config: config.auth.providers.customs })]
        : []),
    ],
  });

  return {
    auth,
  };
}

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { apiKey, organization } from 'better-auth/plugins';
// If your Prisma file is located elsewhere, you can change the path
import client from '@/src/client';

export const auth = betterAuth({
	database: prismaAdapter(client, {
		provider: 'postgresql',
		usePlural: true,
	}),
	socialProviders: {
		github: {
			enabled: true,
			clientId: '',
			clientSecret: '',
		},
		google: {
			enabled: true,
			clientId: '',
			clientSecret: '',
		},
	},
	plugins: [organization()],
});

import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string()
		.min(5, 'Email must be at least 5 character')
		.max(256, 'Email must be at least 256 character'),
	password: z
		.string()
		.min(4, 'Password must be at least 4 character')
		.max(10, 'Password must be at least 256 character'),
});

export const signupSchema = z.object({
	email: z
		.string()
		.min(4, 'Email must be at least 4 character')
		.max(256, 'Email must be at least 256 character'),
	password: z
		.string()
		.min(4, 'Password must be at least 4 character')
		.max(10, 'Password must be at least 256 character'),
});

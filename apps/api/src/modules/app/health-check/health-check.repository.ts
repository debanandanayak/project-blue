import { safely } from '@corentinth/chisels'
import type { PrismaClient } from '@prisma/client/edge'
export async function isDatabaseHealthy({ db }: { db: PrismaClient }) {
	const [result, error] = await safely(await db.$queryRaw`SELECT 1 as result`)
	console.log(result)

	return error === null
}

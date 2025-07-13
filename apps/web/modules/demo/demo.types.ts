import type { Expand } from '@corentinth/chisels'

export type Organization = {
	id: string
	name: string
	createdAt: Date
	updatedAt: Date
}

export type AsDto<T> = Expand<{
	[K in keyof T]: T[K] extends Date ? string : T[K]
}>

import { get } from 'lodash-es'
import { FetchError } from 'ofetch'
import { createRouter } from 'radix3'
import { organizationStorage } from './demo.storage'
import { findMany, getValues } from './demo.storage.models'
import { defineHandler } from './demo-api-mock.models'

const corpus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function randomString({ length = 10 }: { length?: number } = {}) {
	return Array.from(
		{ length },
		() => corpus[Math.floor(Math.random() * corpus.length)],
	).join('')
}

function createId({ prefix }: { prefix: string }) {
	return `${prefix}_${randomString({ length: 24 })}`
}

function assert(
	condition: unknown,
	{ message = 'Error', status }: { message?: string; status?: number } = {},
): asserts condition {
	if (!condition) {
		throw Object.assign(new FetchError(message), { status })
	}
}

function toBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = reject
	})
}

function fromBase64(base64: string) {
	return fetch(base64).then((res) => res.blob())
}

async function serializeFile(file: File) {
	return {
		name: file.name,
		size: file.size,
		type: file.type,
		// base64
		content: await toBase64(file),
	}
}

async function deserializeFile({
	name,
	type,
	content,
}: Awaited<ReturnType<typeof serializeFile>>) {
	return new File([await fromBase64(content)], name, { type })
}

const inMemoryApiMock: Record<string, { handler: any }> = {
	...defineHandler({
		path: '/api/teams',
		method: 'GET',
		handler: async () => {
			const organizations = await getValues(organizationStorage)

			return { organizations }
		},
	}),

	...defineHandler({
		path: '/api/teams',
		method: 'POST',
		handler: async ({ body }) => {
			const organization = {
				id: createId({ prefix: 'org' }),
				name: get(body, 'name'),
				createdAt: new Date(),
				updatedAt: new Date(),
			}

			await organizationStorage.setItem(organization.id, organization)

			return { organization }
		},
	}),
	...defineHandler({
		path: '/api/teams/:teamId',
		method: 'GET',
		handler: async ({ params: { organizationId } }) => {
			const organization = await organizationStorage.getItem(organizationId)

			assert(organization, { status: 403 })

			return { organization }
		},
	}),
}

export const router = createRouter({
	routes: inMemoryApiMock,
	strictTrailingSlash: false,
})

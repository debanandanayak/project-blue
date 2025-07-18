import type { ContentfulStatusCode } from 'hono/utils/http-status'
// biome-ignore lint/suspicious/noShadowRestrictedNames: <this is not global toString>
import { isError, toString } from 'lodash-es'
export { createError, createErrorFactory }
type ErrorOptions = {
	message: string
	code: string
	cause?: unknown
	statusCode: ContentfulStatusCode
	isInternal?: boolean
}

class CustomError extends Error {
	code: string
	cause?: Error | null
	statusCode: ContentfulStatusCode
	isCustomError = true
	isInternal?: boolean

	constructor({ message, code, cause, statusCode, isInternal }: ErrorOptions) {
		super(message)

		this.code = code
		this.cause = isError(cause) ? cause : new Error(toString(cause))
		this.statusCode = statusCode
		this.isInternal = isInternal
	}
}
function createError(options: ErrorOptions) {
	return new CustomError(options)
}
function createErrorFactory(baseOption: ErrorOptions) {
	return (options: Partial<ErrorOptions> = {}) => {
		return createError({ ...baseOption, ...options })
	}
}

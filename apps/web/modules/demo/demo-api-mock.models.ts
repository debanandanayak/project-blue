/* eslint-disable ts/no-empty-object-type */
// import type { HttpClientOptions, ResponseType } from '../shared/http/http-client';
import { joinUrlPaths } from '@corentinth/chisels'


import type { FetchOptions, ResponseType } from 'ofetch'
import { ofetch } from 'ofetch'
import { demoHttpClient } from './demo-http-client'

export { ResponseType }
export type HttpClientOptions<R extends ResponseType = 'json'> = Omit<FetchOptions<R>, 'baseURL'> & { url: string; baseUrl?: string }

function baseHttpClient<A, R extends ResponseType = 'json'>({ url, baseUrl, ...rest }: HttpClientOptions<R>) {
    return ofetch<A, R>(url, {
        baseURL: baseUrl,
        ...rest,
    })
}

export const httpClient = demoHttpClient


type ExtractRouteParams<Path extends string> =
    Path extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof ExtractRouteParams<`/${Rest}`>]: string }
    : Path extends `${infer _Start}:${infer Param}`
    ? { [k in Param]: string }
    : {}

export function defineHandler<Path extends string>({
    path,
    method,
    handler,
}: {
    path: Path
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    handler: <R extends ResponseType = 'json'>(params: { params: ExtractRouteParams<Path> } & HttpClientOptions<R>) => any
}) {
    return {
        [`/${joinUrlPaths(method, path)}`]: { handler },
    }
}

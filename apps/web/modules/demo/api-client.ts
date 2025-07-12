import type { HttpClientOptions, ResponseType } from './http-client';
import { safely } from '@corentinth/chisels';
import { httpClient } from './http-client';
import { get } from 'lodash-es'
export { isHttpErrorWithCode, isHttpErrorWithStatusCode, isRateLimitError };

function isHttpErrorWithCode({ error, code }: { error: unknown; code: string }) {
  return get(error, 'data.error.code') === code;
}

function isHttpErrorWithStatusCode({ error, statusCode }: { error: unknown; statusCode: number }) {
  return get(error, 'status') === statusCode;
}

function isRateLimitError({ error }: { error: unknown }) {
  return isHttpErrorWithStatusCode({ error, statusCode: 429 });
}
export async function apiClient<T, R extends ResponseType = 'json'>({
  path,
  ...rest
}: {
  path: string;
} & Omit<HttpClientOptions<R>, 'url'>) {
  const requestConfig: HttpClientOptions<R> = {
    baseUrl: "http://localhost:3000",
    url: path,
    credentials: 'include',
    ...rest,
  };

  const [response, error] = await safely(httpClient<T, R>(requestConfig));

  if (isHttpErrorWithStatusCode({ error, statusCode: 401 })) {
    window.location.href = '/login';
  }

  if (error) {
    throw error;
  }

  return response;
}
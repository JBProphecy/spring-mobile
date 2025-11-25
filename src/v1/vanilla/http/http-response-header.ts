////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type HttpResponseHeaderName = string

export const HttpResponseHeaderNameVariant = {
  Accept: "Accept",
  ContentType: "Content-Type"
} as const satisfies Record<string, HttpResponseHeaderName>

export type HttpResponseHeaderNameVariant = typeof HttpResponseHeaderNameVariant[keyof typeof HttpResponseHeaderNameVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type HttpResponseHeaderValue = string

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const HttpResponseHeaderContentTypeValueVariant = {
  ApplicationJson: "application/json"
} as const satisfies Record<string, HttpResponseHeaderValue>

export type HttpResponseHeaderContentTypeValueVariant = typeof HttpResponseHeaderContentTypeValueVariant[keyof typeof HttpResponseHeaderContentTypeValueVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getDefiniteHttpResponseHeaderValue(response: Response, name: HttpResponseHeaderName) {
  const value: HttpResponseHeaderValue | null = response.headers.get(name)
  if (value === null) { throw new Error(`A header named [${name}] is missing from the response.`) }
  return value
}

export function ensureHttpResponseHeaderValueEquals(name: HttpResponseHeaderName, value: HttpResponseHeaderValue, expected: HttpResponseHeaderValue) {
  if (value !== expected) { throw new Error(`The value of the header named [${name}] in the response was expected to equal [${expected}], but was received as [${value}].`) }
}

export function ensureHttpResponseHeaderValueStartsWith(name: HttpResponseHeaderName, value: HttpResponseHeaderValue, substring: string) {
  if (!value.startsWith(substring)) { throw new Error(`The value of the header named [${name}] in the response was expected to start with [${substring}], but was received as [${value}].`) }
}

export function ensureHttpResponseHeaderValueIncludes(name: HttpResponseHeaderName, value: HttpResponseHeaderValue, substring: string) {
  if (!value.includes(substring)) { throw new Error(`The value of the header named [${name}] in the response was expected to include [${substring}], but was received as [${value}].`) }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function ensureContentTypeResponseHeaderValueIncludesApplicationJson(value: HttpResponseHeaderValue): void {
  ensureHttpResponseHeaderValueIncludes(HttpResponseHeaderNameVariant.ContentType, value.toLocaleLowerCase(), HttpResponseHeaderContentTypeValueVariant.ApplicationJson)
}

export function ensureContentTypeResponseHeaderAndValueIncludesApplicationJson(response: Response) {
  const contentType = getDefiniteHttpResponseHeaderValue(response, HttpResponseHeaderNameVariant.ContentType)
  ensureContentTypeResponseHeaderValueIncludesApplicationJson(contentType)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { ensureHttpResponseHeaderValueEquals, ensureHttpResponseHeaderValueStartsWith, getDefiniteHttpResponseHeaderValue, HttpResponseHeaderValue } from "@/src/v1/vanilla/http/http-response-header"
import { REQUEST_TYPE_BASE, RESPONSE_TYPE_BASE, ServerRequestType, ServerResponseType } from "./server-constants"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type ServerResponseHeaderName = `X-${string}`

export const ServerResponseHeaderNameVariant = {
  RequestType: "X-Request-Type",
  ResponseType: "X-Response-Type"
} as const satisfies Record<string, ServerResponseHeaderName>

export type ServerResponseHeaderNameVariant = typeof ServerResponseHeaderNameVariant[keyof typeof ServerResponseHeaderNameVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getDefiniteRequestTypeHeaderValue(response: Response): ServerRequestType {
  const value: HttpResponseHeaderValue = getDefiniteHttpResponseHeaderValue(response, ServerResponseHeaderNameVariant.RequestType)
  ensureHttpResponseHeaderValueStartsWith(ServerResponseHeaderNameVariant.RequestType, value, `${REQUEST_TYPE_BASE}:` as const)
  return value as ServerRequestType
}

export function ensureRequestTypeHeaderValueEquals(value: ServerRequestType, expected: ServerRequestType): void {
  ensureHttpResponseHeaderValueEquals(ServerResponseHeaderNameVariant.RequestType, value, expected)
}

export function ensureValidRequestTypeHeaderValue(response: Response, type: ServerRequestType): void {
  const value: ServerRequestType = getDefiniteRequestTypeHeaderValue(response)
  ensureRequestTypeHeaderValueEquals(value, type)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getDefiniteResponseTypeHeaderValue(response: Response): ServerResponseType {
  const value: HttpResponseHeaderValue = getDefiniteHttpResponseHeaderValue(response, ServerResponseHeaderNameVariant.ResponseType)
  ensureHttpResponseHeaderValueStartsWith(ServerResponseHeaderNameVariant.RequestType, value, `${RESPONSE_TYPE_BASE}:` as const)
  return value as ServerResponseType
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

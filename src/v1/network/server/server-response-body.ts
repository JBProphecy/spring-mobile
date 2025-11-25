////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { HttpResponseStatus } from "@/src/v1/vanilla/http/http-response-status"
import { AbstractValidationResult } from "./server-validation"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type HttpRequestContext = {
  type: string
  name: string
  timestamp: string
  method: string
  path: string
}

export type HttpResponseContext = {
  type: string
  name: string
  timestamp: string
  status: HttpResponseStatus
}

export type HttpContext = {
  request: HttpRequestContext
  response: HttpResponseContext
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fundamental

export type ContextResponseBody = {
  context: HttpContext
}

export type ContextMessageResponseBody = {
  context: HttpContext
  message: string
}

export type ContextErrorResponseBody<T> = {
  context: HttpContext
  error: T
}

export type ContextMessageErrorResponseBody<T> = {
  context: HttpContext
  message: string
  error: T
}

export type ContextValidationResponseBody<T> = {
  context: HttpContext
  validation: T
}

export type ContextMessageValidationResponseBody<T> = {
  context: HttpContext
  message: string
  validation: T
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Common

export type AccountNotFoundResponseBody = ContextMessageResponseBody
export type ExpiredAccountAccessTokenResponseBody = ContextMessageResponseBody
export type InternalServerErrorResponseBody = ContextResponseBody
export type InvalidAccountAccessTokenResponseBody = ContextMessageResponseBody
export type InvalidCredentialsResponseBody = ContextMessageResponseBody
export type InvalidRequestBodyResponseBody<T extends AbstractValidationResult> = ContextValidationResponseBody<T>
export type InvalidRequestHeaderResponseBody = ContextMessageResponseBody
export type InvalidSessionTokenResponseBody = ContextMessageResponseBody
export type MissingRequestCookieResponseBody = ContextMessageResponseBody
export type MissingRequestHeaderResponseBody = ContextMessageResponseBody
export type UsernameUnavailableResponseBody = ContextMessageResponseBody

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint-Specific

export type RegisterAccountResponseBodySuccess = ContextMessageResponseBody

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

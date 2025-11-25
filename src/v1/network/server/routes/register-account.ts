////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { HttpRequestHeaderAcceptValueVariant, HttpRequestHeaderContentTypeValueVariant, HttpRequestHeaderNameVariant } from "@/src/v1/vanilla/http/http-request-header"
import { parseJsonResponseBody } from "@/src/v1/vanilla/http/http-response-body"
import { ensureContentTypeResponseHeaderAndValueIncludesApplicationJson } from "@/src/v1/vanilla/http/http-response-header"
import { buildServerRequestUrl } from "../server-constants"
import { ServerRequestVariant } from "../server-request"
import { RegisterAccountRequestBody } from "../server-request-body"
import { ServerResponse, ServerResponseVariant } from "../server-response"
import { ensureValidRequestTypeHeaderValue, getDefiniteResponseTypeHeaderValue } from "../server-response-header"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function sendRegisterAccountRequest(body: RegisterAccountRequestBody): Promise<Response>
{
  const url = buildServerRequestUrl(ServerRequestVariant.RegisterAccount.path)
  return await fetch(url, {
    method: ServerRequestVariant.RegisterAccount.method,
    headers: {
      [HttpRequestHeaderNameVariant.Accept]: HttpRequestHeaderAcceptValueVariant.ApplicationJson,
      [HttpRequestHeaderNameVariant.ContentType]: HttpRequestHeaderContentTypeValueVariant.ApplicationJson
    },
    body: JSON.stringify(body)
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RegisterAccountResponseVariant = {
  Success: ServerResponseVariant.Success,
  InvalidRequestBody: ServerResponseVariant.InvalidRequestBody,
  InternalServerError: ServerResponseVariant.InternalServerError
} as const satisfies Record<string, ServerResponse>

export type RegisterAccountResponseVariant = typeof RegisterAccountResponseVariant[keyof typeof RegisterAccountResponseVariant]
export type RegisterAccountResponseTypeVariant = typeof RegisterAccountResponseVariant[keyof typeof RegisterAccountResponseVariant]["type"]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type RegisterAccountResponseData = {
  type: RegisterAccountResponseTypeVariant
  body: unknown
}

export async function handleRegisterAccountResponse(response: Response): Promise<RegisterAccountResponseData> {
  ensureValidRequestTypeHeaderValue(response, ServerRequestVariant.RegisterAccount.type)
  const responseType = getDefiniteResponseTypeHeaderValue(response) as RegisterAccountResponseTypeVariant
  ensureContentTypeResponseHeaderAndValueIncludesApplicationJson(response)
  const responseBody = await parseJsonResponseBody(response)
  return { type: responseType, body: responseBody }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

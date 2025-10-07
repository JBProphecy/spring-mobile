////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { buildServerRequestUrl } from "@/api/server/server-constants"
import { ServerRequestVariant } from "@/api/server/server-request"
import { RegisterAccountRequestBody } from "@/api/server/server-request-body"
import { ServerResponse, ServerResponseVariant } from "@/api/server/server-response"
import { ensureValidRequestTypeHeaderValue, getDefiniteResponseTypeHeaderValue } from "@/api/server/server-response-header"
import { HttpRequestHeaderAcceptValueVariant, HttpRequestHeaderContentTypeValueVariant, HttpRequestHeaderNameVariant } from "@/common/water/http/http-request-header"
import { parseJsonResponseBody } from "@/common/water/http/http-response-body"
import { ensureContentTypeResponseHeaderAndValueIncludesApplicationJson } from "@/common/water/http/http-response-header"

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

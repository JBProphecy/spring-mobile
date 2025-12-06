////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { buildServerResponseType, ServerResponseType } from "./server-constants";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type ServerResponseName = `${string} Response`

export type ServerResponse = {
  type: ServerResponseType
  name: ServerResponseName
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ServerResponseVariant = {
  Success: {
    type: buildServerResponseType("success"),
    name: "Success Response"
  },
  AccountNotFound: {
    type: buildServerResponseType("account-not-found"),
    name: "Account Not Found Response"
  },
  ExpiredAccountAccessToken: {
    type: buildServerResponseType("expired-account-access-token"),
    name: "Expired Account Access Token Response"
  },
  InternalServerError: {
    type: buildServerResponseType("internal-server-error"),
    name: "Internal Server Error Response"
  },
  InvalidAccountAccessToken: {
    type: buildServerResponseType("invalid-account-access-token"),
    name: "Invalid Account Access Token Response"
  },
  InvalidRequestBody: {
    type: buildServerResponseType("invalid-request-body"),
    name: "Invalid Request Body Response"
  },
  InvalidRequestHeader: {
    type: buildServerResponseType("invalid-request-header"),
    name: "Invalid Request Header Response"
  },
  InvalidCredentials: {
    type: buildServerResponseType("invalid-credentials"),
    name: "Invalid Credentials Response"
  },
  InvalidSessionToken: {
    type: buildServerResponseType("invalid-session-token"),
    name: "Invalid Session Token Response"
  },
  MissingRequestCookie: {
    type: buildServerResponseType("missing-request-cookie"),
    name: "Missing Request Cookie Response"
  },
  MissingRequestHeader: {
    type: buildServerResponseType("missing-request-header"),
    name: "Missing Request Header Response"
  },
  UsernameUnavailable: {
    type: buildServerResponseType("username-unavailable"),
    name: "Username Unavailable Response"
  }
} as const satisfies Record<string, ServerResponse>

export type ServerResponseVariant = typeof ServerResponseVariant[keyof typeof ServerResponseVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

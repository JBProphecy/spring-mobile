////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { HttpRequestMethodVariant } from "@/src/v1/vanilla/http/http-request-method"
import { HttpRequestPath } from "@/src/v1/vanilla/http/http-request-path"
import { buildServerRequestType, ServerRequestType } from "./server-constants"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type ServerRequestName = `${string} Request`

export type ServerRequest = {
  type: ServerRequestType
  name: ServerRequestName
  method: HttpRequestMethodVariant
  path: HttpRequestPath
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ServerRequestVariant = {
  AcquireSessionToken: {
    type: buildServerRequestType("acquire-session-token"),
    name: "Acquire Session Token Request",
    method: HttpRequestMethodVariant.POST,
    path: `/session/bootstrap`
  },
  AuthenticateAccount: {
    type: buildServerRequestType("authenticate-account"),
    name: "Authenticate Account Request",
    method: HttpRequestMethodVariant.POST,
    path: `/auth/account/login`
  },
  DeleteAccount: {
    type: buildServerRequestType("delete-account"),
    name: "Delete Account Request",
    method: HttpRequestMethodVariant.DELETE,
    path: `/account`
  },
  GetAccountProfiles: {
    type: buildServerRequestType("get-account-profiles"),
    name: "Get Account Profiles Request",
    method: HttpRequestMethodVariant.GET,
    path: `/account/profiles`
  },
  RegisterAccount: {
    type: buildServerRequestType("register-account"),
    name: "Register Account Request",
    method: HttpRequestMethodVariant.POST,
    path: `/account/register`
  },
  RegisterAccountVerifyEmail: {
    type: buildServerRequestType("register-account-verify-email"),
    name: "Register Account Verify Email Request",
    method: HttpRequestMethodVariant.POST,
    path: `/account/register/verify-email`
  },
  RegisterProfile: {
    type: buildServerRequestType("register-profile"),
    name: "Register Profile Request",
    method: HttpRequestMethodVariant.POST,
    path: `/profile/register`
  }
} as const satisfies Record<string, ServerRequest>

export type ServerRequestVariant = typeof ServerRequestVariant[keyof typeof ServerRequestVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

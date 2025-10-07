////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type HttpRequestMethod = string

export const HttpRequestMethodVariant = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS"
} as const satisfies Record<string, HttpRequestMethod>

export type HttpRequestMethodVariant = typeof HttpRequestMethodVariant[keyof typeof HttpRequestMethodVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

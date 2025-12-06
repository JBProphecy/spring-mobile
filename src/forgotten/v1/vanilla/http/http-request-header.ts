////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type HttpRequestHeaderName = string

export const HttpRequestHeaderNameVariant = {
  Accept: "Accept",
  ContentType: "Content-Type"
} as const satisfies Record<string, HttpRequestHeaderName>

export type HttpRequestHeaderNameVariant = typeof HttpRequestHeaderNameVariant[keyof typeof HttpRequestHeaderNameVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type HttpRequestHeaderValue = string

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const HttpRequestHeaderAcceptValueVariant = {
  ApplicationJson: "application/json"
} as const satisfies Record<string, HttpRequestHeaderValue>

export type HttpRequestHeaderAcceptValueVariant = typeof HttpRequestHeaderAcceptValueVariant[keyof typeof HttpRequestHeaderAcceptValueVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const HttpRequestHeaderContentTypeValueVariant = {
  ApplicationJson: "application/json"
} as const satisfies Record<string, HttpRequestHeaderValue>

export type HttpRequestHeaderContentTypeValueVariant = typeof HttpRequestHeaderContentTypeValueVariant[keyof typeof HttpRequestHeaderContentTypeValueVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

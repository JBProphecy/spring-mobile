////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type HttpResponseStatusCode = number
export type HttpResponseStatusName = string
export type HttpResponseStatusType = string

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type HttpResponseStatus = {
  code: HttpResponseStatusCode
  name: HttpResponseStatusName
  type: HttpResponseStatusType
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const HttpResponseStatusTypeVariant = {
  INFORMATION: "Information",
  SUCCESS: "Success",
  REDIRECTION: "Redirection",
  CLIENT_ERROR: "Client Error",
  SERVER_ERROR: "Server Error"
} as const satisfies Record<string, HttpResponseStatusType>

export type HttpResponseStatusTypeVariant = typeof HttpResponseStatusTypeVariant[keyof typeof HttpResponseStatusTypeVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const HttpResponseStatusVariant = {
  // 1xx Information
  CONTINUE: { code: 100, name: "Continue", type: HttpResponseStatusTypeVariant.INFORMATION },
  SWITCHING_PROTOCOLS: { code: 101, name: "Switching Protocols", type: HttpResponseStatusTypeVariant.INFORMATION },
  PROCESSING: { code: 102, name: "Processing", type: HttpResponseStatusTypeVariant.INFORMATION },
  EARLY_HINTS: { code: 103, name: "Early Hints", type: HttpResponseStatusTypeVariant.INFORMATION },

  // 2xx Success
  OK: { code: 200, name: "OK", type: HttpResponseStatusTypeVariant.SUCCESS },
  CREATED: { code: 201, name: "Created", type: HttpResponseStatusTypeVariant.SUCCESS },
  ACCEPTED: { code: 202, name: "Accepted", type: HttpResponseStatusTypeVariant.SUCCESS },
  NON_AUTHORITATIVE_INFORMATION: { code: 203, name: "Non-Authoritative Information", type: HttpResponseStatusTypeVariant.SUCCESS },
  NO_CONTENT: { code: 204, name: "No Content", type: HttpResponseStatusTypeVariant.SUCCESS },
  RESET_CONTENT: { code: 205, name: "Reset Content", type: HttpResponseStatusTypeVariant.SUCCESS },
  PARTIAL_CONTENT: { code: 206, name: "Partial Content", type: HttpResponseStatusTypeVariant.SUCCESS },
  MULTI_STATUS: { code: 207, name: "Multi-Status", type: HttpResponseStatusTypeVariant.SUCCESS },
  ALREADY_REPORTED: { code: 208, name: "Already Reported", type: HttpResponseStatusTypeVariant.SUCCESS },
  IM_USED: { code: 226, name: "IM Used", type: HttpResponseStatusTypeVariant.SUCCESS },

  // 3xx Redirection
  MULTIPLE_CHOICES: { code: 300, name: "Multiple Choices", type: HttpResponseStatusTypeVariant.REDIRECTION },
  MOVED_PERMANENTLY: { code: 301, name: "Moved Permanently", type: HttpResponseStatusTypeVariant.REDIRECTION },
  FOUND: { code: 302, name: "Found", type: HttpResponseStatusTypeVariant.REDIRECTION },
  SEE_OTHER: { code: 303, name: "See Other", type: HttpResponseStatusTypeVariant.REDIRECTION },
  NOT_MODIFIED: { code: 304, name: "Not Modified", type: HttpResponseStatusTypeVariant.REDIRECTION },
  TEMPORARY_REDIRECT: { code: 307, name: "Temporary Redirect", type: HttpResponseStatusTypeVariant.REDIRECTION },
  PERMANENT_REDIRECT: { code: 308, name: "Permanent Redirect", type: HttpResponseStatusTypeVariant.REDIRECTION },

  // 4xx Client Error
  BAD_REQUEST: { code: 400, name: "Bad Request", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  UNAUTHORIZED: { code: 401, name: "Unauthorized", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  PAYMENT_REQUIRED: { code: 402, name: "Payment Required", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  FORBIDDEN: { code: 403, name: "Forbidden", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  NOT_FOUND: { code: 404, name: "Not Found", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  METHOD_NOT_ALLOWED: { code: 405, name: "Method Not Allowed", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  NOT_ACCEPTABLE: { code: 406, name: "Not Acceptable", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  PROXY_AUTHENTICATION_REQUIRED: { code: 407, name: "Proxy Authentication Required", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  REQUEST_TIMEOUT: { code: 408, name: "Request Timeout", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  CONFLICT: { code: 409, name: "Conflict", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  GONE: { code: 410, name: "Gone", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  LENGTH_REQUIRED: { code: 411, name: "Length Required", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  PRECONDITION_FAILED: { code: 412, name: "Precondition Failed", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  CONTENT_TOO_LARGE: { code: 413, name: "Content Too Large", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  URI_TOO_LONG: { code: 414, name: "URI Too Long", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  UNSUPPORTED_MEDIA_TYPE: { code: 415, name: "Unsupported Media Type", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  RANGE_NOT_SATISFIABLE: { code: 416, name: "Range Not Satisfiable", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  EXPECTATION_FAILED: { code: 417, name: "Expectation Failed", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  MISDIRECTED_REQUEST: { code: 421, name: "Misdirected Request", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  UNPROCESSABLE_CONTENT: { code: 422, name: "Unprocessable Content", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  LOCKED: { code: 423, name: "Locked", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  FAILED_DEPENDENCY: { code: 424, name: "Failed Dependency", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  TOO_EARLY: { code: 425, name: "Too Early", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  UPGRADE_REQUIRED: { code: 426, name: "Upgrade Required", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  PRECONDITION_REQUIRED: { code: 428, name: "Precondition Required", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  TOO_MANY_REQUESTS: { code: 429, name: "Too Many Requests", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  REQUEST_HEADER_FIELDS_TOO_LARGE: { code: 431, name: "Request Header Fields Too Large", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },
  UNAVAILABLE_FOR_LEGAL_REASONS: { code: 451, name: "Unavailable For Legal Reasons", type: HttpResponseStatusTypeVariant.CLIENT_ERROR },

  // 5xx Server Error
  INTERNAL_SERVER_ERROR: { code: 500, name: "Internal Server Error", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  NOT_IMPLEMENTED: { code: 501, name: "Not Implemented", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  BAD_GATEWAY: { code: 502, name: "Bad Gateway", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  SERVICE_UNAVAILABLE: { code: 503, name: "Service Unavailable", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  GATEWAY_TIMEOUT: { code: 504, name: "Gateway Timeout", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  HTTP_VERSION_NOT_SUPPORTED: { code: 505, name: "HTTP Version Not Supported", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  VARIANT_ALSO_NEGOTIATES: { code: 506, name: "Variant Also Negotiates", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  INSUFFICIENT_STORAGE: { code: 507, name: "Insufficient Storage", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  LOOP_DETECTED: { code: 508, name: "Loop Detected", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  BANDWIDTH_LIMIT_EXCEEDED: { code: 509, name: "Bandwidth Limit Exceeded", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  NOT_EXTENDED: { code: 510, name: "Not Extended (Obsoleted)", type: HttpResponseStatusTypeVariant.SERVER_ERROR },
  NETWORK_AUTHENTICATION_REQUIRED: { code: 511, name: "Network Authentication Required", type: HttpResponseStatusTypeVariant.SERVER_ERROR }
} as const satisfies Record<string, HttpResponseStatus>

export type HttpResponseStatusVariant = typeof HttpResponseStatusVariant[keyof typeof HttpResponseStatusVariant]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

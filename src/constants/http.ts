/* eslint-disable no-magic-numbers */
export const enum EHttpStatus {
  ok = 200,
  created = 201,
  accepted = 202,
  noContent = 204,

  multipleChoices = 300,
  movedPermanently = 301,
  found = 302,
  notModified = 304,

  badRequest = 400,
  forbidden = 403,
  notFound = 404,
  methodNotAllowed = 405,
  gone = 410,
  requestEntityTooLarge = 413,
  requestUriTooLong = 414,
  locked = 423,
  tooManyRequests = 429,

  serverError = 500,
  badGateway = 502,
  serviceUnavailable = 503,
  gatewayTimeout = 504
}

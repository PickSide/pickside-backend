import { CookieOptions, Request, Response } from 'express'

export enum Status {
	Ok = 200,
	Created = 201,
	Accepted = 202,
	NoContent = 204,

	BadRequest = 400,
	Unauthorized = 401,
	PaymentRequired = 402,
	Forbidden = 403,
	NotFound = 404,
	MethodNotAllowed = 405,
	RequestTimeout = 408,
	Conflict = 409,

	InternalServerError = 500,
	NotImplemented = 501,
	BadGateway = 502,
	ServiceUnavailable = 503,
	NetworkAuthenticationRequired = 511,
}

interface CookieProps {
	name: string
	val: string
	cookieOpts: CookieOptions
}

export function SendResponse(res: Response, statusCode?: Status, json?: any, cookie?: CookieProps) {
	if (!res) {
		return
	}

	let response = res

	if (statusCode) response = response.status(statusCode)
	if (json) response = response.json(json)
	if (cookie) response = response.cookie(cookie.name, cookie.val, cookie.cookieOpts)

	return response
}

export function MessageResponse(msg: string) {
	return {
		message: msg,
		timeStamp: Date.now()
	}
}

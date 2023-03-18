import { Response } from 'express'

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

export enum AppContext {
	Account = 'Account',
	Activity = 'Activity',
	Level = 'Level',
	Locale = 'Locale',
	Session = 'Session',
	Sport = 'Sport',
	User = 'User',
}

export const DefaultServerResponseMap = {
	200: `Ok.`,
	201: `Ressource was successfully created.`,
	202: `Accepted`,
	204: `No content`,

	400: `Bad request`,
	401: `Unauthorized action`,
	402: `Payment required`,
	403: `Forbidden action`,
	404: `Ressource not found`,
	405: `Method not allowed`,
	408: `Request timeout`,
	409: `Conflict. Ressource already exists`,

	500: `Internal server error.`,
	501: `Endpoint not implemented.`,
	502: `Bad gateway.`,
	503: `Service is currently unavailable.`,
	511: `Network authentication is required.`,
}

export function SendResponse(res: Response, statusCode?: Status, json?: any) {
	if (!res) {
		return
	}

	let response = res

	if (statusCode) response = response.status(statusCode)
	if (json) response = response.json(json)

	return response
}

export function MessageResponse(msg: string, extra?: any) {
	return {
		message: msg,
		timeStamp: Date.now(),
		...extra,
	}
}

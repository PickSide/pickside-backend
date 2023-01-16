import { Request, Response } from 'express'

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

export function SendStatusWithMessage(res: Response, statusCode: Status, message?: any) {
	if (!res) {
		return
	}

	res.sendStatus(statusCode).json(message)
}

export function SendStatusOnly(res: Response, statusCode: Status) {
	if (!res) {
		return
	}

	res.sendStatus(statusCode)
}

export function SendResponseJson(res: Response, jsonObject: any) {
	if (!res) {
		return
	}

	res.json(jsonObject)
}

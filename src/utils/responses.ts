import { timeStamp } from 'console'
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

export interface MessageReponseProps {
	message: string
	status: any
	timeStamp: Date
}

export function SendResponse(res: Response, statusCode?: Status, msgResponse?: any) {
	if (!res) {
		return
	}

	let response = res

	if (statusCode) response = response.status(statusCode)
	if (msgResponse) response = response.json({
		...msgResponse,
		timeStamp: Date.now()
	})

	return response
}
export const AccountCreatedSuccess = {
	message: 'Account created successfully',
}

export const ActivityCreatedSuccess = {
	message: 'Activity created successfully',
}

export const ParticipantAlreadyRegistered = {
	message: 'Already registered to this activity',
}

export const ParticipantSuccessfullyRegistered = {
	message: 'Successfully registered to activity',
}

export const InvalidToken = {
	message: 'Invalid token',
}

export const UserAlreadyExists = {
	message: 'Username or email already in use',
}

export const WrongCredentials = {
	message: 'Username or password is incorrect',
}

export const DeleteSuccessfully = {
	message: 'Delete successfully',
}

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
	Activity = 'Activity',
	Court = 'Court',
	CustomCourt = 'Custom Court',
	DB = 'DB',
	Email = 'Email',
	Group = 'Group',
	Locale = 'Locale',
	Notification = 'Notification',
	Schedule = 'Schedule',
	Sport = 'Sport',
	Token = 'Token',
	User = 'User',
}

export enum JobType {
	ResetDb = 'resetdb',
	Login = 'login',
	Logout = 'logout',
	Register = 'register',
	GetAccessToken = 'getaccesstoken',
	GetCourt = 'getcourt',
	GetGroupForUser = 'getgroupforuser',
	UpdateUser = 'updateuser',
	GetCustomCourts = 'getcustomcourts',
	GetCustomCourt = 'getcustomcourt',
	AddCutomCourt = 'addcustomcourt',
	DeleteCustomCourt = 'deletecustomcourt',
	DeleteGroup = 'deletegroup',
	VerifyEmail = 'vertifyemail',
	DeactivateAccount = 'deactivateaccount',
	ReactivateAccount = 'deactivateaccount',
	ActivityFavorite = 'addactivitytofavorites',
	ActivityRegister = 'registerusertoactivity',
}

export enum FailReason {
	DbResetFailed = 'dbresetfailed',
	TokenExpired = 'tokenexpired',
	TokenError = 'tokenerror',
	TokenInvalid = 'tokeninvalid',
	BadPayload = 'wrongpayload',
	BadParams = 'wrongparams',
	GroupCreationError = 'groupcreationerror',
	GroupDeletionError = 'groupdeletionerror',
	UserDeactivateAccount = 'userdeactivateaccount',
	UserReactivateAccount = 'userreactivateaccount',
	UserInactive = 'userinactive',
	UserExists = 'userexists',
	UserFailedToUpdate = 'userfailtoupdate',
	UserWrongCredentials = 'userbadcredentials',
	UserLogout = 'userlogout',
	UserNotFound = 'usernotfound',
	UserAlreadyRegisteredToActivity = 'useralreadyregisteredtoactivity',
	UserNotRegisteredToActivity = 'usernotregisteredtoactivity',
	ActivityNotFound = 'activitynotfound',
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
	callback?: string
	context?: AppContext
	extra?: any
	failReason?: FailReason
	jobStatus?: 'FAILED' | 'COMPLETED'
	jobType?: JobType
	message?: string
	res: Response
	status: Status
	timeStamp?: Date
	payload?: any
	redirectUri?: string
}

export function SendErrorResponse({
	callback,
	context,
	extra = {},
	failReason,
	res,
	message,
	status,
	timeStamp = new Date(),
	jobType,
	jobStatus,
	redirectUri,
}: MessageReponseProps) {
	if (!res) return

	return res.status(status).json({
		callback,
		context,
		jobStatus,
		jobType,
		timeStamp,
		redirectUri,
		error: {
			failReason,
			message,
			status,
			...extra,
		},
	})
}

export function SendSuccessPayloadResponse({
	context,
	payload,
	timeStamp = new Date(),
	res,
	redirectUri,
	status,
}: MessageReponseProps) {
	if (!res) return

	return res.status(status).json({
		context,
		timeStamp,
		redirectUri,
		...payload,
	})
}

export function SendSuccessListPayloadResponse({ callback, context, results, timeStamp = new Date(), res, status }) {
	if (!res) return

	return res.status(status).json({
		callback,
		context,
		results,
		timeStamp,
	})
}

export function SendSuccessResponseMessage({
	context,
	timeStamp = new Date(),
	res,
	message,
	redirectUri,
	status,
}: Omit<MessageReponseProps, 'payload'>) {
	if (!res) return

	return res.status(status).json({
		context,
		message,
		timeStamp,
		redirectUri,
	})
}

export function SendResponse(res: Response, statusCode?: Status, msgResponse?: any) {
	if (!res) {
		return
	}

	let response = res

	if (statusCode) response = response.status(statusCode)
	if (msgResponse)
		response = response.json({
			...msgResponse,
			timeStamp: Date.now(),
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

export const GroupCreatedSuccess = {
	message: 'Group created successfully',
}

export const GroupDeletedSuccess = {
	message: 'Group deleted successfully',
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

export const ProfileSuccessfullyUpdated = {
	message: 'Profile settings updated',
}

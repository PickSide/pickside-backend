import { ACCOUNT_TYPE, DEFAULT_USER_PERMISSIONS, ROLES } from '../schemas/User'
import {
	AppContext,
	FailReason,
	JobType,
	SendErrorResponse,
	SendResponse,
	SendSuccessListPayloadResponse,
	SendSuccessPayloadResponse,
	Status,
} from '@utils/responses'
import { OnlineUserModel, UserModel } from '@schemas'
import { Request, Response } from 'express'

import { decode } from 'jsonwebtoken'
import { setRefreshAndAccessTokens } from '@utils/token'

export const getMe = async (req: Request, res: Response) => {
	const refreshToken = req.cookies.refreshToken

	if (refreshToken) {
		const { username = null, email = null }: any = decode(req.cookies.refreshToken)

		if (!username || !email) {
			return SendErrorResponse({
				res, status: Status.Forbidden,
				jobStatus: 'FAILED',
				jobType: JobType.GetMe,
				message: 'Please login'
			})
		}

		const user = await UserModel
			.findOne({ $and: [{ username }, { email }] })
			.select('-password')
			.exec()


		if (!user) {
			return SendErrorResponse({
				context: AppContext.User,
				failReason: FailReason.BadPayload,
				jobStatus: 'FAILED',
				jobType: JobType.Login,
				message: 'Invalid authentication',
				res,
				status: Status.Unauthorized,
			})
		}

		await OnlineUserModel.addAsOnlineIfNotPresent(user)

		return SendSuccessPayloadResponse({ res, payload: { result: user }, status: Status.Ok })
	}
}

export const getUsers = async (req: Request, res: Response) => {
	let users

	if (req.query.startsWith) {
		users = await UserModel.find({
			$or: [{ username: { $regex: '^' + req.query.startsWith } }, { fullName: { $regex: '^' + req.query.startsWith } }],
		})
			.select('avatar name username fullName email reliability')
			.exec()
	} else if (req.query['status']) {
		if (req.query['status'] === 'online') {
			users = await OnlineUserModel.find()
				.populate({ path: 'user', select: 'avatar name username fullName email reliability' })
				.exec()
				.then((result) => result.flatMap((x) => x.user))
		}
	} else {
		users = await UserModel.find().select('avatar name username fullName email reliability').exec()
	}

	return SendSuccessListPayloadResponse({ res, status: Status.Ok, results: users })
}

export const create = async (req: Request, res: Response) => {
	const payload = req.body.data

	const userExists = await UserModel.exists({ $or: [{ email: payload.email }] })

	if (userExists) {
		return SendErrorResponse({
			context: AppContext.User,
			failReason: FailReason.UserExists,
			jobStatus: 'FAILED',
			jobType: JobType.Register,
			message: 'Username or email already in use.',
			res,
			status: Status.BadRequest,
		})
	}

	const account = await UserModel.create({
		accountType: ACCOUNT_TYPE.DEFAULT,
		permissions: DEFAULT_USER_PERMISSIONS,
		role: ROLES.USER,
		...payload
	})

	await setRefreshAndAccessTokens(account, res)

	return SendSuccessPayloadResponse({ res, payload: { result: account }, status: Status.Created })
}

export const updateAvatar = async (req: Request, res: Response) => {
	await UserModel.findByIdAndUpdate(req.params.id, { avatar: req.body.data.avatar })
		.exec()
		.then((result) => SendSuccessPayloadResponse({ res, status: Status.Ok, payload: { result }, message: 'Avatar updated' }))
		.catch((error) => SendErrorResponse({ res, status: Status.InternalServerError, message: error.message }))
}

export const updateSettings = async (req: Request, res: Response) => {
	const setting = req.body.data

	return await UserModel.findByIdAndUpdate(req.params.id, { ...setting })
		.exec()
		.then((data) => {
			return SendSuccessPayloadResponse({ res, status: Status.Ok, payload: { result: setting, message: 'Setting updated' } })
		})
		.catch((error) => {
			return SendErrorResponse({
				context: AppContext.User,
				failReason: FailReason.UserFailedToUpdate,
				jobStatus: 'FAILED',
				jobType: JobType.UpdateUser,
				message: 'Something went wrong.',
				res,
				status: Status.InternalServerError,
			})
		})
}

export const reactivate = async (req: Request, res: Response) => {
	return await UserModel.findByIdAndUpdate(req.params.userId, { inactive: false, inactiveDate: null })
		.exec()
		.then(() => SendResponse(res, Status.Ok, { message: 'Account successfully reactivated' }))
		.catch(() =>
			SendErrorResponse({
				context: AppContext.User,
				failReason: FailReason.UserReactivateAccount,
				jobStatus: 'FAILED',
				jobType: JobType.ReactivateAccount,
				message: 'Error reactivating account',
				res,
				status: Status.BadRequest,
			}),
		)
}

export const deactivate = async (req: Request, res: Response) => {
	return await UserModel.findByIdAndUpdate(req.params.userId, { inactive: true, inactiveDate: Date.now() })
		.exec()
		.then(() => SendResponse(res, Status.Ok, { message: 'Account successfully deactivated. You can now logout.' }))
		.catch(() =>
			SendErrorResponse({
				context: AppContext.User,
				failReason: FailReason.UserDeactivateAccount,
				jobStatus: 'FAILED',
				jobType: JobType.DeactivateAccount,
				message: 'Error deactivating account',
				res,
				status: Status.BadRequest,
			}),
		)
}

export const clearOnlineUsers = async (req: Request, res: Response) => {
	return await OnlineUserModel.deleteMany().then(() => 'success')
}

export const remove = async (req: Request, res: Response) => { }

export default {
	getMe,
	getUsers,
	create,
	updateAvatar,
	updateSettings,
	reactivate,
	deactivate,
	clearOnlineUsers,
}

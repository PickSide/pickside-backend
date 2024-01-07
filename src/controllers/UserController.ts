import {
	AccountCreatedSuccess,
	AppContext,
	FailReason,
	JobType,
	SendErrorResponse,
	SendResponse,
	SendSuccessListPayloadResponse,
	SendSuccessPayloadResponse,
	Status,
} from '../utils/responses'
import { Request, Response } from 'express'
import User, { ACCOUNT_TYPE, DEFAULT_USER_PERMISSIONS, IUser, ROLES } from '../schemas/User'

import OnlineUser from '../schemas/OnlineUser'
import { decode } from 'jsonwebtoken'
import { hashSync } from 'bcrypt'
import { omit } from 'lodash'

export interface MulterFile {
	key: string // Available using `S3`.
	path: string // Available using `DiskStorage`.
	mimetype: string
	originalname: string
	size: number
}

export const getMe = async (req: Request, res: Response) => {
	const refreshToken = req.cookies.refreshToken

	if (refreshToken) {
		const { username = null, email = null }: any = decode(req.cookies.refreshToken)

		if (!username || !email) {
			return SendErrorResponse({ res, status: Status.Forbidden, jobStatus: 'FAILED', jobType: JobType.GetMe })
		}

		return await User.findOne({ $and: [{ username }, { email }] }).exec()
			.then((response) =>
				SendSuccessPayloadResponse({ res, payload: { result: response }, status: Status.Ok })
			)
	}
}

export const getUsers = async (req: Request, res: Response) => {
	let users

	if (req.query.startsWith) {
		users = await User.find({
			$or: [{ username: { $regex: '^' + req.query.startsWith } }, { fullName: { $regex: '^' + req.query.startsWith } }],
		})
			.select('avatar name username fullName email reliability')
			.exec()
	} else if (req.query['status']) {
		if (req.query['status'] === 'online') {
			users = await OnlineUser.find()
				.populate({ path: 'user', select: 'avatar name username fullName email reliability' })
				.exec()
				.then((result) => result.flatMap((x) => x.user))
		}
	} else {
		users = await User.find().select('avatar name username fullName email reliability').exec()
	}

	return SendSuccessListPayloadResponse({ res, status: Status.Ok, results: users })
}

export const create = async (req: Request, res: Response) => {
	const user = req.body.data
	const pwd = req.body.data.password

	const userExists = await User.exists({ $or: [{ email: user.email }] })

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

	const account = await User.create({
		accountType: ACCOUNT_TYPE.DEFAULT,
		email: user.email,
		password: hashSync(pwd, 10),
		fullName: user.fullName,
		phone: user.phone,
		sexe: user.sexe,
		permissions: DEFAULT_USER_PERMISSIONS,
		role: ROLES.USER,
	})

	return SendResponse(res, Status.Ok, { ...AccountCreatedSuccess, payload: { ...omit(account, ['password']) } })
}

export const updateAvatar = async (req: Request, res: Response) => {
	await User.findByIdAndUpdate(req.params.id, { avatar: req.body.data.avatar })
		.exec()
		.then((result) => SendSuccessPayloadResponse({ res, status: Status.Ok, payload: { result }, message: 'Avatar updated' }))
		.catch((error) => SendErrorResponse({ res, status: Status.InternalServerError, message: error.message }))
}

export const updateSettings = async (req: Request, res: Response) => {
	const setting = req.body.data

	return await User.findByIdAndUpdate(req.params.id, { ...setting })
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
	return await User.findByIdAndUpdate(req.params.userId, { inactive: false, inactiveDate: null })
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
	return await User.findByIdAndUpdate(req.params.userId, { inactive: true, inactiveDate: Date.now() })
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
	return await OnlineUser.deleteMany().then(() => 'success')
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

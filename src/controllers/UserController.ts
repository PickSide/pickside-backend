import {
	AccountCreatedSuccess,
	AppContext,
	FailReason,
	JobType,
	ProfileSuccessfullyUpdated,
	SendErrorResponse,
	SendResponse,
	Status,
} from '../utils/responses'
import { Request, Response } from 'express'

import User from '../schemas/User'
import { hashSync } from 'bcrypt'
import { omit } from 'lodash'

export const get = async (req: Request, res: Response) => {}

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
		email: user.email,
		password: hashSync(pwd, 10),
		fullName: user.fullName,
		phone: user.phone,
		sexe: user.sexe,
	})

	return SendResponse(res, Status.Ok, { ...AccountCreatedSuccess, payload: { ...omit(account, ['password']) } })
}

export const update = async (req: Request, res: Response) => {
	const setting = req.body.data

	return await User.findByIdAndUpdate(req.params.id, { ...setting })
		.exec()
		.then((data) => {
			return SendResponse(res, Status.Ok, { ...ProfileSuccessfullyUpdated })
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
		.then(() => SendResponse(res, Status.Ok, { message: 'Account successfully deactivated' }))
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

export const remove = async (req: Request, res: Response) => {}

import { AccountCreatedSuccess, DefaultServerResponseMap, ProfileSuccessfullyUpdated, SendResponse, Status, UserAlreadyExists } from '../utils/responses'
import { Request, Response } from 'express'
import { merge, omit } from 'lodash'

import User from '../schemas/User'
import { hashSync } from 'bcrypt'

export const get = async (req: Request, res: Response) => { }

export const create = async (req: Request, res: Response) => {
	const user = req.body.data
	const pwd = req.body.data.password

	if (!!(await User.findOne({ $or: [{ email: user.email }, { username: user.username }] }))) {
		return SendResponse(res, Status.Conflict, UserAlreadyExists)
	}
	const account = await User.create({
		email: user.email,
		username: user.username,
		password: hashSync(pwd, 10),
		firstName: user.firstName,
		lastName: user.lastName,
		phone: user.phone,
		sexe: user.sexe,
	})
	return SendResponse(
		res,
		Status.Ok,
		{ ...AccountCreatedSuccess, payload: { ...omit(account, ['password']) } },
	)
}

export const update = async (req: Request, res: Response) => {
	const setting = req.body.data

	return await User.findByIdAndUpdate(req.params.id, { ...setting })
		.exec()
		.then(data => {
			console.log(data)
			return SendResponse(
				res,
				Status.Ok,
				{ ...ProfileSuccessfullyUpdated },
			)
		})
		.catch(error => {
			console.log(error)
			return SendResponse(
				res,
				Status.BadRequest,
				DefaultServerResponseMap[Status.BadRequest],
			)
		})
}

export const remove = async (req: Request, res: Response) => { }

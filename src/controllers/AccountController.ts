import Account from '../models/Account'
import { Request, Response } from 'express'
import { AccountCreatedSuccess, UserAlreadyExists, SendResponse, Status } from '../utils/responses'
import { omit } from 'lodash'
import { hashSync } from 'bcrypt'

export const get = async (req: Request, res: Response) => { }
export const create = async (req: Request, res: Response) => {
	const user = req.body.data
	const pwd = req.body.data.password

	if (!!(await Account.findOne({ $or: [{ email: user.email }, { username: user.username }] }))) {
		return SendResponse(res, Status.Conflict, UserAlreadyExists)
	}
	const account = await Account.create({
		email: user.email,
		username: user.username,
		password: hashSync(pwd, 10),
		profile: {
			...omit(user, ['email', 'password', 'username']),
		},
		configs: {
			defaultSport: 'soccer',
			darkModeDefault: false,
			locationTracking: false,
		},
	})
	return SendResponse(
		res,
		Status.Ok,
		{ ...AccountCreatedSuccess, payload: { ...omit(account, ['password']) } },
	)
}
export const update = async (req: Request, res: Response) => { }
export const remove = async (req: Request, res: Response) => { }

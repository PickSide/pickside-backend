import User from '../models/User'
import { Request, Response } from 'express'
import { SendResponseJson, SendStatusWithMessage, Status } from '../utils/responses'
import { omit } from 'lodash'
import { hashSync } from 'bcrypt'

const index = async (req: Request, res: Response) => {
	const users = await User.find()
	return SendStatusWithMessage(res, Status.Ok, { results: users })
}
const store = async (req: Request, res: Response) => {
	console.log(req.body)
	const user = omit(req.body, 'password')
	const original = req.body.password
	const hashed = hashSync(original, 10)

	const userExists = await User.findOne({ $or: [{ email: user.email }, { username: user.username }] })

	console.log(userExists)

	if (!!userExists) {
		return SendStatusWithMessage(res, Status.Conflict, 'Username or email already exists.')
	}

	const created = await User.create({ ...user, password: hashed })

	return SendResponseJson(res, {
		username: created.username,
		password: original,
	})
}
const update = async (req: Request, res: Response) => {
	return SendStatusWithMessage(res, Status.NoContent, 'Updated successfully')
}
const destroy = async (req: Request, res: Response) => {
	return SendStatusWithMessage(res, Status.NoContent, 'Deleted successfully')
}
export default {
	index,
	store,
	update,
	destroy,
}

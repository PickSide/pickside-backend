import User from '../models/User'
import { Request, Response } from 'express'
import { MessageResponse, SendResponse, Status } from '../utils/responses'
import { omit } from 'lodash'
import { hashSync } from 'bcrypt'

const index = async (req: Request, res: Response) => {
	const users = await User.find()
	return SendResponse(res, Status.Ok, { results: users })
}
const store = async (req: Request, res: Response) => {
	console.log(req.body)
	const user = omit(req.body, 'password')
	const original = req.body.password
	const hashed = hashSync(original, 10)

	const userExists = await User.findOne({ $or: [{ email: user.email }, { username: user.username }] })

	console.log(userExists)

	if (!!userExists) {
		return SendResponse(res, Status.Conflict, MessageResponse('Username or email already exists.'))
	}

	const created = await User.create({ ...user, password: hashed })

	return SendResponse(res, Status.Ok, {
		username: created.username,
		password: original,
	})
}
const update = async (req: Request, res: Response) => {
	return SendResponse(res, Status.NoContent, MessageResponse('Updated successfully'))
}
const destroy = async (req: Request, res: Response) => {
	return SendResponse(res, Status.NoContent, MessageResponse('Deleted successfully'))
}
export default {
	index,
	store,
	update,
	destroy,
}

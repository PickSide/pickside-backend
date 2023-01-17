import User from '../models/User'
import { Request, Response } from 'express'
import { SendStatusWithMessage, Status } from '../utils/responses'

const index = async (req: Request, res: Response) => {
	const users = await User.find()
	return SendStatusWithMessage(res, Status.Ok, { results: users })
}
const store = async (req: Request, res: Response) => {
	return SendStatusWithMessage(res, Status.NoContent, 'Stored successfully')
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

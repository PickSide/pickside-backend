import { Request, Response } from 'express'
import { MessageResponse, SendResponse, Status } from '../utils/responses'
import Locale from '../models/Locale'

const index = async (req: Request, res: Response) => {
	const locales = await Locale.find()
	return SendResponse(res, Status.Ok, { results: locales })
}
const store = async (req: Request, res: Response) => {
	return SendResponse(res, Status.NoContent, MessageResponse('Stored successfully'))
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

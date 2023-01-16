import { Request, Response } from 'express'
import { SendResponseJson, SendStatusWithMessage, Status } from '../utils/responses'
import Locale from '../models/Locale'

const index = async (req: Request, res: Response) => {
	const locales = await Locale.find()
	return SendResponseJson(res, { results: locales })
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

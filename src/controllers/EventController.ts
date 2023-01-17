import Event from '../models/Event'
import { Request, Response } from 'express'
import { SendStatusWithMessage, SendResponseJson, Status } from '../utils/responses'

const index = async (req: Request, res: Response) => {
	const events = await Event.find()
	return SendResponseJson(res, { results: events })
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

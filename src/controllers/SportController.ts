import Sport from '../models/Sport'
import { Request, Response } from 'express'
import { MessageResponse, SendResponse, Status } from '../utils/responses'

const index = async (req: Request, res: Response) => {
	const sports = await Sport.find()
	return SendResponse(res, Status.Ok, { results: sports })
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

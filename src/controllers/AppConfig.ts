import { Request, Response } from 'express'
import { SendResponseJson, SendStatusWithMessage, Status } from '../utils/responses'
import AppConfig from '../models/AppConfig'

const index = async (req: Request, res: Response) => {
	const { userId } = req.params
	const userConfig = await AppConfig.findOne({ userId })
	return SendResponseJson(res, userConfig)
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

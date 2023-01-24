import { Request, Response } from 'express'
import { SendResponseJson, SendStatusWithMessage, Status } from '../utils/responses'
import AppConfig, { IAppConfig } from '../models/AppConfig'

const index = async (req: Request, res: Response) => {
	const { userId } = req.params
	const userConfig = userId
		? await AppConfig.findOne({ userId }).exec()
		: await AppConfig.findOne({ isGuest: true }).exec()
	return SendResponseJson(res, userConfig)
}
const store = async (req: Request, res: Response) => {
	return SendStatusWithMessage(res, Status.NoContent, 'Stored successfully')
}
const update = async (req: Request, res: Response) => {
	const data = req.body as IAppConfig
	const updated = await AppConfig.findByIdAndUpdate({ _id: data.userId })
	console.log(updated)
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

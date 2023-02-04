import { Request, Response } from 'express'
import { SendResponseJson, SendStatusWithMessage, Status } from '../utils/responses'
import UserConfig, { IUserConfig } from '../models/UserConfig'

const index = async (req: Request, res: Response) => {
	const { userId } = req.params
	const userConfig = userId
		? await UserConfig.findOne({ userId }).exec()
		: await UserConfig.findOne({ isGuest: true }).exec()
	return SendResponseJson(res, userConfig)
}
const store = async (req: Request, res: Response) => {
	return SendStatusWithMessage(res, Status.NoContent, 'Stored successfully')
}
const update = async (req: Request, res: Response) => {
	const data = req.body as IUserConfig
	const updated = await UserConfig.findByIdAndUpdate({ _id: data.userId })
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

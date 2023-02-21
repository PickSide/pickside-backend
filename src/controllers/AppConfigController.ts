import { Request, Response } from 'express'
import { MessageResponse, SendResponse, Status } from '../utils/responses'
import UserConfig, { IUserConfig } from '../models/UserConfig'

const index = async (req: Request, res: Response) => {
	const { userId } = req.params
	const userConfig = userId
		? await UserConfig.findOne({ userId }).exec()
		: await UserConfig.findOne({ isGuest: true }).exec()
	return SendResponse(res, undefined, { ...userConfig })
}
const store = async (req: Request, res: Response) => {
	return SendResponse(res, Status.NoContent, MessageResponse('Stored successfully'))
}
const update = async (req: Request, res: Response) => {
	const data = req.body as IUserConfig
	const updated = await UserConfig.findByIdAndUpdate({ _id: data.userId })
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

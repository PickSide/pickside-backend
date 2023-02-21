import { Request, Response } from 'express'
import { MessageResponse, SendResponse, Status } from '../utils/responses'
import AppTheme, { IAppTheme } from '../models/AppTheme'

const index = async (req: Request, res: Response) => {
	const appThemes = await AppTheme.find()
	return SendResponse(res, Status.Ok, { results: appThemes })
}
const store = async (req: Request, res: Response) => {
	return SendResponse(res, Status.NoContent, MessageResponse('Stored successfully'))
}
const update = async (req: Request, res: Response) => {
	// const data = req.body as IUserConfig
	// const updated = await UserConfig.findByIdAndUpdate({ _id: data.userId })
	// console.log(updated)
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

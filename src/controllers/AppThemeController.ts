import { Request, Response } from 'express'
import { SendResponseJson, SendStatusWithMessage, Status } from '../utils/responses'
import AppTheme, { IAppTheme } from '../models/AppTheme'

const index = async (req: Request, res: Response) => {
	const appThemes = await AppTheme.find()
	return SendResponseJson(res, { results: appThemes })
}
const store = async (req: Request, res: Response) => {
	return SendStatusWithMessage(res, Status.NoContent, 'Stored successfully')
}
const update = async (req: Request, res: Response) => {
	// const data = req.body as IUserConfig
	// const updated = await UserConfig.findByIdAndUpdate({ _id: data.userId })
	// console.log(updated)
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

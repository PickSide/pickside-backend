import { Request, Response } from 'express'
import { SendResponse, Status } from '../utils/responses'

import { LocaleModel } from '@schemas'

export const get = async (req: Request, res: Response) => {
	const locales = await LocaleModel.find()
	SendResponse(res, Status.Ok, { results: locales })
}
export const store = async (req: Request, res: Response) => {
	// Not implemented
}
export const update = async (req: Request, res: Response) => {
	// Not implemented
}
export const destroy = async (req: Request, res: Response) => {
	// Not implemented
}

export default { get }

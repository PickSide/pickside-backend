import { Request, Response } from 'express'
import { SendSuccessResponse, Status } from '../utils/responses'

import Locale from '../schemas/Locale'

export const get = async (req: Request, res: Response) => {
	const locales = await Locale.find()
	SendSuccessResponse(res, Status.Ok, { results: locales })
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

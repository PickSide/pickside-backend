import { Request, Response } from 'express'
import { SendResponse, Status } from '../utils/responses'

import { SportModel } from '@schemas'

export const getAllSports = async (req: Request, res: Response) => {
	const sports = await SportModel.find()
	SendResponse(res, Status.Ok, { results: sports })
}

export default {
	getAllSports,
}

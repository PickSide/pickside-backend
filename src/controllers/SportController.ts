import { Request, Response } from 'express'
import { SendSuccessResponse, Status } from '../utils/responses'

import Sport from '../schemas/Sport'

export const getAllSports = async (req: Request, res: Response) => {
	const sports = await Sport.find()
	SendSuccessResponse(res, Status.Ok, { results: sports })
}
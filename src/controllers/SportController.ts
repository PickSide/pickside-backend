import { Request, Response } from 'express'
import { SendResponse, Status } from '../utils/responses'

import Sport from '../schemas/Sport'

export const getAllSports = async (req: Request, res: Response) => {
	const sports = await Sport.find()
	SendResponse(res, Status.Ok, { results: sports })
}

export default {
	getAllSports,
}

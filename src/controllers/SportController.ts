import Sport from '../schemas/Sport'
import { Request, Response } from 'express'
import { SendResponse, Status } from '../utils/responses'

export const getAllSports = async (req: Request, res: Response) => {
	const sports = await Sport.find()
	SendResponse(res, Status.Ok, { results: sports })
}
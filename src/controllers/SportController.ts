import Sport from '../models/Sport'
import { Request, Response } from 'express'
import { SendResponse, Status } from '../utils/responses'

export const get = async (req: Request, res: Response) => {
	const sports = await Sport.find()
	SendResponse(res, Status.Ok, { results: sports })
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

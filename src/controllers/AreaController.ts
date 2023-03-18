import { Request, Response } from 'express'
import { SendResponse, Status } from '../utils/responses'
import Area from '../models/Area'

export const get = async (req: Request, res: Response) => {
	const areas = await Area.find()
	SendResponse(res, Status.Ok, { results: areas })
}
export const create = async (req: Request, res: Response) => {
	// Not implemented
}
export const update = async (req: Request, res: Response) => {
	// Not implemented
}
export const remove = async (req: Request, res: Response) => {
	// Not implemented
}

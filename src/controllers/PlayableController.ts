import Playable from '../models/Playable'
import { Request, Response } from 'express'
import { SendResponse, Status } from '../utils/responses'

export const get = async (req: Request, res: Response) => {
    const playables = await Playable.find()
    SendResponse(res, Status.Ok, { results: playables })
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

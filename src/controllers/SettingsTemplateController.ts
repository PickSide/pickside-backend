import SettingsTemplate from '../models/SettingsTemplate'
import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { MessageResponse, SendResponse, Status } from '../utils/responses'
import { secrets } from '../utils/secrets'

export const get = async (req: Request, res: Response) => {
    const templates = await SettingsTemplate.find()
    return res.json(templates[0]).status(Status.Ok)
}
export const create = async (req: Request, res: Response) => {
}
export const update = async (req: Request, res: Response) => {
    // Not implemented
}
export const remove = async (req: Request, res: Response) => {
    // Not implemented
}

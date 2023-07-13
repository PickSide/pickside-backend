import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendResponse, Status } from '../utils/responses'
import { Request, Response } from 'express'

import CustomCourt from '../schemas/CustomCourt'

export const getAllCustomCourts = async (req: Request, res: Response) => {
    const customCourts = await CustomCourt.find()
    return SendResponse(res, Status.Ok, { results: customCourts })
}
export const createCustomCourt = async (req: Request, res: Response) => { }
export const getCustomCourtById = async (req: Request, res: Response) => { }
export const deleteCustomCourtById = async (req: Request, res: Response) => { }
export const getCustomCourtByUserId = async (req: Request, res: Response) => { }
export const deleteCustomCourtByUserId = async (req: Request, res: Response) => { }
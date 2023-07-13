import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendSuccessResponse, Status } from '../utils/responses'
import { Request, Response } from 'express'

import Schedule from '../schemas/Schedule'

export const getAllSchedules = async (req: Request, res: Response) => {
    const customCourts = await Schedule.find()
    return SendSuccessResponse(res, Status.Ok, { results: customCourts })
}
export const getAllScheduleForUserId = async (req: Request, res: Response) => { }
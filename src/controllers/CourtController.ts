import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendSuccessResponse, Status } from '../utils/responses'
import { Request, Response } from 'express'

import Court from '../schemas/Court'

export const getSystemDefinedCourts = async (req: Request, res: Response) => {
    const courts = await Court.find()
    return SendSuccessResponse(res, Status.Ok, { results: courts })
}
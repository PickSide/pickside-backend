import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendResponse, Status } from '../utils/responses'
import { Request, Response } from 'express'

import Court from '../schemas/Court'

export const getSystemDefinedCourts = async (req: Request, res: Response) => {
    const courts = await Court.find()
    return SendResponse(res, Status.Ok, { results: courts })
}
import Court from '../schemas/Court'
import { Request, Response } from 'express'
import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendResponse, Status } from '../utils/responses'

export const getSystemDefinedCourts = async (req: Request, res: Response) => {
    const courts = await Court.find()
    return SendResponse(res, Status.Ok, { results: courts })
}
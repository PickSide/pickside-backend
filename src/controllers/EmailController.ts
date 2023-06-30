import Email from '../schemas/Email'
import { Request, Response } from 'express'
import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendResponse, Status } from '../utils/responses'

export const verify = async (req: Request, res: Response) => { }
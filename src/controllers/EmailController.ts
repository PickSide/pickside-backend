import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendSuccessResponse, Status } from '../utils/responses'
import { Request, Response } from 'express'

import Email from '../schemas/Email'

export const verify = async (req: Request, res: Response) => { }
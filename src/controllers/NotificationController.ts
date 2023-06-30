import Notification from '../schemas/Notification'
import { Request, Response } from 'express'
import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendResponse, Status } from '../utils/responses'

export const getAllNotifications = async (req: Request, res: Response) => {
    const notifications = await Notification.find()
    return SendResponse(res, Status.Ok, { results: notifications })
}
export const getAllGlobalNotifications = async (req: Request, res: Response) => { }
export const getNotificationsForUserId = async (req: Request, res: Response) => { }
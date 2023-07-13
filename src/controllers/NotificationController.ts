import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendSuccessResponse, Status } from '../utils/responses'
import { Request, Response } from 'express'

import Notification from '../schemas/Notification'

export const getAllNotifications = async (req: Request, res: Response) => {
    const notifications = await Notification.find({
        $or: [
            { type: 'global' },
            { type: 'system' },
            {
                type: 'user',
                receiver: req.params.userId
            },
        ]
    }).populate([
        { path: 'receiver', select: { firstName: 1, lastName: 1, avatar: 1 } },
        { path: 'sender', select: { firstName: 1, lastName: 1, avatar: 1 } }
    ])

    return SendSuccessResponse(res, Status.Ok, { results: notifications })
}
export const markNotificationRead = async (req: Request, res: Response) => {
    const notificationId = req.params.notificationId

    await Notification.findByIdAndUpdate(notificationId, { isRead: true })

    return SendSuccessResponse(res, Status.Created, { message: 'Read' })
}
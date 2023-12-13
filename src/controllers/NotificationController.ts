import { Request, Response } from 'express'
import { SendResponse, Status } from '../utils/responses'

import Notification from '../schemas/Notification'

export const getAllNotifications = async (req: Request, res: Response) => {
	const notifications = await Notification.find({
		receiver: { $eq: req.params.userId },
	}).populate([
		{ path: 'receiver', select: { firstName: 1, lastName: 1, avatar: 1 } },
		{ path: 'sender', select: { firstName: 1, lastName: 1, avatar: 1 } },
	])

	return SendResponse(res, Status.Ok, { results: notifications })
}
export const markNotificationRead = async (req: Request, res: Response) => {
	const notificationId = req.params.notificationId

	await Notification.findByIdAndUpdate(notificationId, { isRead: true })

	return SendResponse(res, Status.Created, { message: 'Read' })
}

export default { getAllNotifications, markNotificationRead }

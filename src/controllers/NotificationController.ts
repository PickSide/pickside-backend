import { FailReason, SendErrorResponse, SendResponse, SendSuccessListPayloadResponse, Status } from '../utils/responses'
import { Request, Response } from 'express'

import { NotificationModel } from '@schemas'

export const getAllNotifications = async (req: Request, res: Response) => {
	if (!req.params.userId) {
		return SendErrorResponse({
			res,
			failReason: FailReason.UserNotFound,
			status: Status.BadRequest,
			message: 'User is not defined'
		})
	}
	const notifications = await NotificationModel.find({
		receiver: { $eq: req.params.userId },
	}).populate([
		{ path: 'receiver', select: { firstName: 1, lastName: 1, avatar: 1 } },
		{ path: 'sender', select: { firstName: 1, lastName: 1, avatar: 1 } },
	])

	return SendSuccessListPayloadResponse({ res, status: Status.Ok, results: notifications })
}
export const markNotificationRead = async (req: Request, res: Response) => {
	const notificationId = req.params.notificationId

	await NotificationModel.findByIdAndUpdate(notificationId, { isRead: true })

	return SendResponse(res, Status.Created, { message: 'Read' })
}

export default { getAllNotifications, markNotificationRead }

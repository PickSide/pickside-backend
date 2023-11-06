import {
	AppContext,
	JobType,
	SendErrorResponse,
	SendSuccessListPayloadResponse,
	SendSuccessPayloadResponse,
	Status,
} from '../utils'
import { Request, Response } from 'express'

import Message from '../schemas/Message'

export const getAllMessagesForChatroom = async (req: Request, res: Response) => {
	const messages = await Message.find({ chatRoomId: { $eq: req.params.chatRoomId } }).exec()
	return SendSuccessListPayloadResponse({
		res,
		results: messages,
		status: Status.Ok,
	})
}
export const sendMessageToChatroom = async (req: Request, res: Response) => {
	const { message, chatRoomId, sentBy } = req.body.data

	await Message.create({
		message,
		chatRoomId,
		sentBy,
	})
		.then((result) =>
			SendSuccessPayloadResponse({
				res,
				status: Status.Created,
				payload: result,
			}),
		)
		.catch((error) =>
			SendErrorResponse({
				res,
				jobType: JobType.SendMessage,
				jobStatus: 'FAILED',
				context: AppContext.Message,
				message: 'Something went wrong while sending the message.',
				status: Status.InternalServerError,
			}),
		)
}
export const createMessages = (req: Request, res: Response) => {}
export const getAllMessages = (req: Request, res: Response) => {}

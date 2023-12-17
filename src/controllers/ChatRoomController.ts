import { AppContext, JobType, SendErrorResponse, SendSuccessPayloadResponse, Status } from '../utils'
import { Request, Response } from 'express'

import Chatroom from '../schemas/Chatroom'
import Message from '../schemas/Message'

export const getOrInitializeChatroom = async (req: Request, res: Response) => {
	const { participants, name } = req.body.data

	if (!participants.length) {
		return SendErrorResponse({
			res,
			jobType: JobType.GetChatroom,
			jobStatus: 'FAILED',
			context: AppContext.Message,
			message: 'Something went wrong fetching chatroom.',
			status: Status.InternalServerError,
		})
	}

	const chatroom = await Chatroom.findOne({ participants: { $all: participants } })
		.populate('name participants')
		.exec()

	if (!!chatroom) {
		return SendSuccessPayloadResponse({
			res,
			status: Status.Ok,
			payload: {
				jobStatus: 'COMPLETED',
				status: 'Ok',
				payload: chatroom,
				message: 'Found chatroom.',
			},
		})
	}

	const newChatroom = await Chatroom.create({
		participants,
		name,
	})

	return SendSuccessPayloadResponse({
		res,
		status: Status.Ok,
		payload: {
			jobStatus: 'COMPLETED',
			status: 'Ok',
			payload: newChatroom,
			message: 'Created chatroom.',
		},
	})
}
export const sendMessageToChatroom = async (req: Request, res: Response) => {
	if (!req.body.data) {
		return
	}

	const { message, chatroomId, sender } = req.body.data

	await Message.create({
		message,
		chatroomId,
		sender,
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
export const updateChatroom = (req: Request, res: Response) => {}
export const deleteChatroom = (req: Request, res: Response) => {}

export default { getOrInitializeChatroom, sendMessageToChatroom, updateChatroom, deleteChatroom }

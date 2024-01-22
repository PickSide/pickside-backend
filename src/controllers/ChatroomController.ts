import { AppContext, JobType, SendErrorResponse, SendSuccessPayloadResponse, Status } from '../utils'
import { ChatroomModel, MessageModel } from '@schemas'
import { Request, Response } from 'express'

export const getOrInitializeChatroom = async (req: Request, res: Response) => {
	const { participants } = req.body.data

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

	const chatroom = await ChatroomModel.findOne({ participants: { $all: participants } })
		.populate('name participants')
		.exec()

	if (chatroom) {
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

	const newChatroom = await ChatroomModel.create({
		participants,
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

	await MessageModel.create({
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
export const updateChatroom = (req: Request, res: Response) => { }
export const deleteChatroom = (req: Request, res: Response) => { }

export default { getOrInitializeChatroom, sendMessageToChatroom, updateChatroom, deleteChatroom }

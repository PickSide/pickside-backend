import {
	AppContext,
	FailReason,
	JobType,
	SendErrorResponse,
	SendSuccessListPayloadResponse,
	SendSuccessPayloadResponse,
	Status,
} from '../utils'
import Chatroom, { IChatroom } from '../schemas/Chatroom'
import { Request, Response } from 'express'

import Message from '../schemas/Message'

export const initializeChatroom = async (req: Request, res: Response) => {
	const { participants, startedBy: initiator } = req.body.data
	await Chatroom.create({
		participants,
		startedBy: initiator,
		openedChatroom: [initiator],
	})
		.then((result) =>
			SendSuccessPayloadResponse({
				context: AppContext.Token,
				payload: result,
				res,
				status: Status.Created,
			}),
		)
		.catch((error) =>
			SendErrorResponse({
				context: AppContext.Chatroom,
				failReason: FailReason.ChatroomInitializationError,
				jobStatus: 'FAILED',
				jobType: JobType.InitializeChatroom,
				message: `Something went wrong during chat room initialization`,
				res,
				status: Status.InternalServerError,
			}),
		)
}
export const getChatroomByInitiatorId = async (req: Request, res: Response) => {
	const chatrooms = await Chatroom.find({ startedBy: { $eq: req.params.id } })
		.populate('_id participants startedBy openedChatroom')
		.exec()

	if (!chatrooms.length) {
		return SendErrorResponse({
			context: AppContext.Chatroom,
			failReason: FailReason.ChatroomInitializationError,
			jobStatus: 'FAILED',
			jobType: JobType.GetChatroom,
			message: 'Chatroom(s) not found',
			res,
			status: Status.NotFound,
		})
	}

	return SendSuccessListPayloadResponse({
		res,
		results: chatrooms,
		status: Status.Ok,
	})
}
export const sendMessageToChatroom = async (req: Request, res: Response) => {
	const { message, chatroom, sentBy } = req.body.data

	let chatroomObj = chatroom

	if (!chatroom) {
		chatroomObj = _initializeChatroom(chatroom)
	}

	await Message.create({
		message,
		chatroomId: chatroomObj.id,
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
export const updateChatroom = (req: Request, res: Response) => {}
export const deleteChatroom = (req: Request, res: Response) => {}

async function _initializeChatroom(chatroom: Partial<IChatroom>) {
	return await Chatroom.create({ ...chatroom })
}
export default { initializeChatroom, getChatroomByInitiatorId, sendMessageToChatroom, updateChatroom, deleteChatroom }

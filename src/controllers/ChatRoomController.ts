import {
	AppContext,
	FailReason,
	JobType,
	SendErrorResponse,
	SendSuccessListPayloadResponse,
	SendSuccessPayloadResponse,
	Status,
} from '../utils'
import { Request, Response } from 'express'

import ChatRoom from '../schemas/ChatRoom'

export const initializeChatroom = async (req: Request, res: Response) => {
	const { participants, startedBy: initiator } = req.body.data
	await ChatRoom.create({
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
	const chatrooms = await ChatRoom.find({ startedBy: { $eq: req.params.id } }).populate('participants startedBy openedChatroom').exec()

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
export const updateChatroom = (req: Request, res: Response) => {}
export const deleteChatroom = (req: Request, res: Response) => {}

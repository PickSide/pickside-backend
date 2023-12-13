import { Request, Response } from 'express'
import { SendSuccessListPayloadResponse, Status } from '../utils'

import Message from '../schemas/Message'

export const getAllMessagesByChatroomId = async (req: Request, res: Response) => {
	const chatroomId = req.body.data?.chatroomId

	if (!chatroomId) {
		return
	}

	const messages = await Message.find({ chatroomId: { $eq: chatroomId } }).exec()
	return SendSuccessListPayloadResponse({
		res,
		results: messages,
		status: Status.Ok,
	})
}
export const createMessages = (req: Request, res: Response) => {}
export const getAllMessages = (req: Request, res: Response) => {}

export default {
	getAllMessagesByChatroomId,
	createMessages,
	getAllMessages,
}

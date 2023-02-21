import Event from '../models/Event'
import { Request, Response } from 'express'
import { MessageResponse, SendResponse, Status } from '../utils/responses'

const index = async (req: Request, res: Response) => {
	const events = await Event.find()
	return SendResponse(res, Status.Ok, { results: events })
}
const store = async (req: Request, res: Response) => {
	await Event.create({ ...req.body })
	return SendResponse(res, Status.Created, MessageResponse('Event Created successfully'))
}
const update = async (req: Request, res: Response) => {
	const { eventId } = req.params
	const { userId } = req.body

	const participantsToUpdate = await Event.findById({ _id: eventId })
		.exec()
		.then((response) => response?.participants)

	if (participantsToUpdate?.includes(userId)) {
		return SendResponse(res, Status.Conflict, MessageResponse('Participant is already registered'))
	}

	participantsToUpdate?.push(userId)

	await Event.findOneAndUpdate({ _id: eventId }, { participants: participantsToUpdate }).exec()

	return SendResponse(res, Status.NoContent, MessageResponse('Participant registered'))
}
const destroy = async (req: Request, res: Response) => {
	return SendResponse(res, Status.NoContent, MessageResponse('Deleted successfully'))
}
export default {
	index,
	store,
	update,
	destroy,
}

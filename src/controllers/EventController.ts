import Event from '../models/Event'
import { Request, Response } from 'express'
import { MessageResponse, SendResponse, Status } from '../utils/responses'
import { omit } from 'lodash'

const index = async (req: Request, res: Response) => {
	const events = await Event.find()
	return SendResponse(res, Status.Ok, { results: events })
}
const store = async (req: Request, res: Response) => {
	const event = await Event.create({ ...req.body.data })
	return SendResponse(res, Status.Created, MessageResponse('Event Created successfully', { response: { id: event.id }, status: 'Created' }))
}
const update = async (req: Request, res: Response) => {
	const { eventId } = req.params
	const { userId } = req.body.data

	const participants = await Event.findById({ _id: eventId })
		.exec()
		.then((response) => response?.participants)

	if (participants?.includes(userId)) {
		return SendResponse(res, Status.Conflict, MessageResponse('Participant is already registered'))
	}

	participants?.push(userId)

	const updated = await Event.findOneAndUpdate({ _id: eventId }, { participants }, { new: true }).exec()

	return SendResponse(res, Status.Ok, MessageResponse('Participant registered', { response: updated, status: 'Registered' }))
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

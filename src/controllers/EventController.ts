import Event from '../models/Event'
import { Request, Response } from 'express'
import { SendStatusWithMessage, SendResponseJson, Status } from '../utils/responses'

const index = async (req: Request, res: Response) => {
	const events = await Event.find()
	return SendResponseJson(res, { results: events })
}
const store = async (req: Request, res: Response) => {
	await Event.create({ ...req.body })
	return SendStatusWithMessage(res, Status.Created, 'Event Created successfully')
}
const update = async (req: Request, res: Response) => {
	const { eventId } = req.params
	const { userId } = req.body

	const participantsToUpdate = await Event.findById({ _id: eventId })
		.exec()
		.then((response) => response?.participants)

	if (participantsToUpdate?.includes(userId)) {
		return SendStatusWithMessage(res, Status.Conflict, 'Participant is already registered')
	}

	participantsToUpdate?.push(userId)

	await Event.findOneAndUpdate({ _id: eventId }, { participants: participantsToUpdate }).exec()

	return SendStatusWithMessage(res, Status.NoContent, 'Participant registered')
}
const destroy = async (req: Request, res: Response) => {
	return SendStatusWithMessage(res, Status.NoContent, 'Deleted successfully')
}
export default {
	index,
	store,
	update,
	destroy,
}

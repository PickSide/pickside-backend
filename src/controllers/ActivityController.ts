import Activity from '../models/Activity'
import { Request, Response } from 'express'
import { MessageResponse, SendResponse, Status } from '../utils/responses'

export const get = async (req: Request, res: Response) => {
	const activitys = await Activity.find()
	return SendResponse(res, Status.Ok, { results: activitys })
}
export const create = async (req: Request, res: Response) => {
	const activity = await Activity.create({ ...req.body.data })
	return SendResponse(
		res,
		Status.Created,
		MessageResponse('Activity Created successfully', { response: { id: activity.id }, status: 'Created' }),
	)
}
export const update = async (req: Request, res: Response) => {
	const { activityId } = req.params
	const { userId } = req.body.data

	const participants = await Activity.findById({ _id: activityId })
		.exec()
		.then((response) => response?.participants)

	if (participants?.includes(userId)) {
		return SendResponse(res, Status.Conflict, MessageResponse('Participant is already registered'))
	}

	participants?.push(userId)

	const updated = await Activity.findOneAndUpdate({ _id: activityId }, { participants }, { new: true }).exec()

	return SendResponse(
		res,
		Status.Ok,
		MessageResponse('Participant registered', { response: updated, status: 'Registered' }),
	)
}
export const remove = async (req: Request, res: Response) => {
	return SendResponse(res, Status.NoContent, MessageResponse('Deleted successfully'))
}

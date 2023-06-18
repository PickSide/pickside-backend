import Activity from '../models/Activity'
import { Request, Response } from 'express'
import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendResponse, Status } from '../utils/responses'

export const get = async (req: Request, res: Response) => {
	const activities = await Activity.find()
	return SendResponse(res, Status.Ok, { results: activities })
}
export const create = async (req: Request, res: Response) => {

	const activity = await Activity.create({ ...req.body.data })

	return SendResponse(
		res,
		Status.Created,
		{ ...ActivityCreatedSuccess, response: { activity }, status: 'Created' },
	)
}
export const update = async (req: Request, res: Response) => {
	const { activityId } = req.params
	const { userId } = req.body.data

	const participants = await Activity.findById({ _id: activityId })
		.exec()
		.then((response) => response?.participants)

	if (participants?.includes(userId)) {
		return SendResponse(res, Status.Conflict, ParticipantAlreadyRegistered)
	}

	participants?.push(userId)

	const updated = await Activity.findOneAndUpdate({ _id: activityId }, { participants }, { new: true }).exec()

	return SendResponse(
		res,
		Status.Ok,
		{ ...ParticipantSuccessfullyRegistered, response: updated, status: 'Registered' },
	)
}
export const remove = async (req: Request, res: Response) => { }

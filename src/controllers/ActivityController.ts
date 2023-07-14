import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendResponse, Status } from '../utils/responses'
import { Request, Response } from 'express'

import Activity from '../schemas/Activity'

export const getAllActivities = async (req: Request, res: Response) => {
	const activities = await Activity.find()
		.populate([
			{ path: 'organiser', select: { firstName: 1, lastName: 1, avatar: 1 } },
			{ path: 'participants', select: { firstName: 1, lastName: 1, avatar: 1 } },
			'sport'
		])
		.exec()
	return SendResponse(res, Status.Ok, { results: activities })
}
export const createActivity = async (req: Request, res: Response) => {

	const activity = await Activity.create({ ...req.body.data })

	return SendResponse(
		res,
		Status.Created,
		{ ...ActivityCreatedSuccess, response: { activity }, status: 'Created' },
	)
}
export const getActivityById = async (req: Request, res: Response) => { }
export const updateActivityById = async (req: Request, res: Response) => {
	const { activityId } = req.params
	const { userId } = req.body.data

	const participants = await Activity.findById({ id: activityId })
		.exec()
		.then((response) => response?.participants)

	if (participants?.includes(userId)) {
		return SendResponse(res, Status.Conflict, ParticipantAlreadyRegistered)
	}

	participants?.push(userId)

	const updated = await Activity.findOneAndUpdate({ id: activityId }, { participants }, { new: true }).exec()

	return SendResponse(
		res,
		Status.Ok,
		{ ...ParticipantSuccessfullyRegistered, response: updated, status: 'Registered' },
	)
}
export const removeActivityById = async (req: Request, res: Response) => { }
export const getActivityByGroupId = async (req: Request, res: Response) => { }


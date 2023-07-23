import { ActivityCreatedSuccess, AppContext, FailReason, JobType, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendErrorResponse, SendResponse, SendSuccessPayloadResponse, Status } from '../utils/responses'
import { Request, Response } from 'express'

import Activity from '../schemas/Activity'
import User from '../schemas/User'

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
	const { address, date, images, maxPlayers, mode, price, rules, sport, time, title } = req.body.data

	const activity = await Activity.create({
		address,
		date,
		maxPlayers,
		mode,
		price,
		rules,
		sport: sport.id,
		time,
		title
	})

	return SendSuccessPayloadResponse({
		res,
		status: Status.Created,
		payload: { ...ActivityCreatedSuccess, response: { activity }, status: 'Created' },
	})
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


export const updateFavorites = async (req: Request, res: Response) => {
	const { userId } = req.body.data

	if (!userId) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.BadPayload,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityFavorite,
			message: 'Wrong payload.',
			res,
			status: Status.BadRequest,
		})
	}

	const user = await User.findById(userId).exec()

	if (user) {
		const idx = user.favorites.findIndex((favId) => favId == req.params.activityId)

		if (idx === -1) {
			user.favorites.push(req.params.activityId)
		} else {
			user.favorites.splice(idx, 1)
		}

		await user.save()

		return SendSuccessPayloadResponse({
			res,
			status: Status.Ok,
			payload: { jobStatus: 'COMPLETED', status: 'Created', message: 'Successfully added to favorites.', result: { favorites: user.favorites } }
		})
	}
}


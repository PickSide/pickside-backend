import {
	ActivityCreatedSuccess,
	AppContext,
	FailReason,
	JobType,
	ParticipantAlreadyRegistered,
	ParticipantSuccessfullyRegistered,
	SendErrorResponse,
	SendResponse,
	SendSuccessPayloadResponse,
	Status,
} from '../utils/responses'
import { Request, Response } from 'express'

import Activity from '../schemas/Activity'
import User from '../schemas/User'

export const getAllActivities = async (req: Request, res: Response) => {
	const activities = await Activity.find()
		.populate([
			{ path: 'organizer', select: { id: 1, fullName: 1, username: 1, avatar: 1 } },
			{ path: 'participants', select: { fullName: 1, username: 1, avatar: 1 } },
			'sport',
		])
		.exec()
	return SendResponse(res, Status.Ok, { results: activities })
}
export const createActivity = async (req: Request, res: Response) => {
	const {
		address,
		date,
		images,
		maxPlayers,
		organizer: organizerId,
		mode,
		price,
		rules,
		sport,
		time,
		title,
		isPrivate,
	} = req.body.data

	const organizer = await User.findById({ _id: organizerId }, { fullName: 1, username: 1, reliability: 1 })

	const activity = await Activity.create({
		address,
		date,
		maxPlayers,
		participants: [organizer],
		mode,
		organizer,
		price,
		rules,
		sport: sport.id,
		time,
		title,
		isPrivate,
	})

	return SendSuccessPayloadResponse({
		res,
		status: Status.Created,
		payload: { ...ActivityCreatedSuccess, response: { activity }, status: 'Created' },
	})
}
export const getActivityById = async (req: Request, res: Response) => {}
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

	return SendResponse(res, Status.Ok, { ...ParticipantSuccessfullyRegistered, response: updated, status: 'Registered' })
}
export const removeActivityById = async (req: Request, res: Response) => {}
export const getActivityByGroupId = async (req: Request, res: Response) => {}

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
			payload: {
				jobStatus: 'COMPLETED',
				status: 'Updated',
				message: 'Successfully added to favorites.',
				result: { favorites: user.favorites },
			},
		})
	}
}

export const registerParticipant = async (req: Request, res: Response) => {
	const { userId } = req.body.data

	if (!userId) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.BadPayload,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: 'Wrong payload.',
			res,
			status: Status.BadRequest,
		})
	}

	if (!req.params.activityId) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.BadParams,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: 'Wrong params.',
			res,
			status: Status.BadRequest,
		})
	}

	const user = await User.findById(userId).exec()
	const activity = await Activity.findById(req.params.activityId)
		.populate({ path: 'participants', select: { id: 1 } })
		.exec()
	//@ts-ignore
	const isUserRegistered = activity?.participants.some((participant) => participant.equals(userId))

	if (!activity) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.ActivityNotFound,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: 'Activity not found.',
			res,
			status: Status.NotFound,
		})
	}

	if (!user) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.UserNotFound,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: 'User not found',
			res,
			status: Status.NotFound,
		})
	}

	if (isUserRegistered) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.UserAlreadyRegisteredToActivity,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: 'User already registered',
			res,
			status: Status.NotFound,
		})
	}

	activity.participants.push(user)

	await activity.save()

	return SendSuccessPayloadResponse({
		res,
		status: Status.Ok,
		payload: {
			jobStatus: 'COMPLETED',
			status: 'Registered',
			result: { participants: activity.participants },
			message: 'Successfully registered to activity.',
		},
	})
}

export const unregisterParticipant = async (req: Request, res: Response) => {
	const { userId } = req.body.data

	if (!userId) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.BadPayload,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: 'Wrong payload.',
			res,
			status: Status.BadRequest,
		})
	}

	if (!req.params.activityId) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.BadParams,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: 'Wrong params.',
			res,
			status: Status.BadRequest,
		})
	}

	const activity = await Activity.findById(req.params.activityId).exec()
	const user = await User.findById(userId).exec()
	const isUserRegistered = activity?.participants.some((participant) => participant.equals(userId))

	if (!activity) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.ActivityNotFound,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: 'Activity not found.',
			res,
			status: Status.NotFound,
		})
	}

	if (!user) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.UserNotFound,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: 'User not found',
			res,
			status: Status.NotFound,
		})
	}

	if (!isUserRegistered) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.UserNotRegisteredToActivity,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: 'User is not registered to event',
			res,
			status: Status.NotFound,
		})
	}

	const activityParticipantIdx = activity.participants.findIndex((participant) => participant === user.id)

	activity.participants.splice(activityParticipantIdx, 1)

	await activity.save()

	return SendSuccessPayloadResponse({
		res,
		status: Status.Ok,
		payload: {
			jobStatus: 'COMPLETED',
			status: 'Registered',
			result: { participants: activity.participants },
			message: 'Successfully unregistered from activity.',
		},
	})
}

export const getUserFavorites = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId).populate('favorites')

	if (!user) {
		return SendErrorResponse({
			context: AppContext.Activity,
			failReason: FailReason.UserNotFound,
			jobStatus: 'FAILED',
			jobType: JobType.ActivityRegister,
			message: `User doesn't exists`,
			res,
			status: Status.NotFound,
		})
	}

	return SendSuccessPayloadResponse({
		res,
		status: Status.Ok,
		payload: {
			jobStatus: 'COMPLETED',
			status: 'Registered',
			result: user.favorites,
			message: 'Successfully registered to activity.',
		},
	})
}

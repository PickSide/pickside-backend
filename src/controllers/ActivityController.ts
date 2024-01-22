import {
	ActivityCreatedSuccess,
	AppContext,
	FailReason,
	JobType,
	SendErrorResponse,
	SendSuccessListPayloadResponse,
	SendSuccessPayloadResponse,
	Status,
} from '../utils/responses'
import { ActivityModel, UserModel } from '@schemas'
import { Request, Response } from 'express'

/**
 * @description - Gets list of all activities
 * @param req - Request's object
 * @param res - Response's object
 * @returns - Payload with the activities
 */
export const getAllActivities = async (req: Request, res: Response) => {
	const activities = await ActivityModel.find()
		.populate([
			{ path: 'organizer', select: 'fullName username avatar' },
			{ path: 'participants', select: 'fullName username avatar' },
			'sport',
		])
		.exec()

	return SendSuccessListPayloadResponse({ res, results: activities, status: Status.Ok })
}

/**
 * @description - Creates an activity
 * @param req - Request's object
 * @param res - Response's object
 * @returns - Payload with the created activity
 */
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

	const organizer = await UserModel
		.findById(organizerId)
		.select('fullName username email reliability')

	const activity = await ActivityModel.create({
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
		message: ActivityCreatedSuccess.message,
		payload: { result: activity },
	})
}

/**
 * @description - Updates the user's favorites
 * @param req - Request's object
 * @param res - Response's object
 * @returns - Payload with an array of the user's favorites
 */
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

	const user = await UserModel.findById(userId).exec()

	if (user) {
		const idx = user.favorites?.findIndex((favId) => favId.id == req.params.activityId) || -1

		if (idx > -1) {
			user.favorites?.splice(idx, 1)
		} else {
			const activity = await ActivityModel.findById(req.params.activityId)
			if (activity) {
				user.favorites?.push(activity)
			}
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

/**
 * @description Registers a participant to an activity
 * @param req - Request's object
 * @param res - Response's object
 * @returns - Payload with an array of the activity's participants
 */
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

	const user = await UserModel.findById(userId).exec()
	const activity = await ActivityModel.findById(req.params.activityId)
		.populate({ path: 'participants', select: { id: 1 } })
		.exec()

	const isUserRegistered = activity?.participants.some((participant) => participant.id === userId)

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

	activity.participants?.push(user)

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

/**
 * @description Unregisters a participant from an activity
 * @param req - Request's object
 * @param res - Response's object
 * @returns - Payload with an array of the activity's participants
 */
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

	const activity = await ActivityModel.findById(req.params.activityId).exec()
	const user = await UserModel.findById(userId).exec()
	const isUserRegistered = activity?.participants?.some((participant) => participant.id === userId)

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

	const activityParticipantIdx = activity.participants?.findIndex((participant) => participant === user.id) || -1

	activity.participants?.splice(activityParticipantIdx, 1)

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

/**
 * @description Returns a user's favorites
 * @param req - Request's object
 * @param res - Response's object
 * @returns - Payload with an array of the user's favorites
 */
export const getUserFavorites = async (req: Request, res: Response) => {
	const user = await UserModel.findById(req.params.userId).populate('favorites')

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

export default {
	getAllActivities,
	createActivity,
	updateFavorites,
	registerParticipant,
	unregisterParticipant,
	getUserFavorites,
}

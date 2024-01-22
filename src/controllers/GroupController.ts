import {
	AppContext,
	FailReason,
	GroupCreatedSuccess,
	GroupDeletedSuccess,
	JobType,
	SendErrorResponse,
	SendResponse,
	SendSuccessPayloadResponse,
	Status,
} from '../utils/responses'
import { GroupModel, UserModel } from '@schemas'
import { Request, Response } from 'express'

export const getAllGroups = async (req: Request, res: Response) => {
	const groups = await GroupModel.find().populate([
		{ path: 'members', select: 'fullName email username avatar' },
		{ path: 'organizer', select: 'fullName email username avatar' },
		{ path: 'sport', select: 'name' },
	])

	return SendResponse(res, Status.Ok, { results: groups })
}
export const getAllGroupsForUserId = async (req: Request, res: Response) => {
	const user = await UserModel.findById(req.params.userId)

	if (!user) {
		return SendErrorResponse({
			context: AppContext.Group,
			failReason: FailReason.UserNotFound,
			jobStatus: 'FAILED',
			jobType: JobType.GetGroupForUser,
			message: `User not found.`,
			res,
			status: Status.NotFound,
		})
	}

	const groups = await GroupModel.find({ organizer: { $eq: user.id } })
		.populate('organizer members sport')
		.exec()

	return SendResponse(res, Status.Ok, { results: groups })
}
export const createGroup = async (req: Request, res: Response) => {
	const { description, members, name, requireApproval, sport, organizer, visibility } = req.body.data

	await GroupModel.create({
		description,
		members,
		name,
		requireApproval,
		organizer,
		sport,
		visibility,
	})
		.then(async (createdGroup) => {
			const updatedUser = await UserModel.findByIdAndUpdate(
				organizer,
				{ $push: { groups: createdGroup } },
				{ upsert: true, new: true },
			).exec()
			return { createdGroup, updatedUser }
		})
		.then(({ createdGroup, updatedUser }) => {
			if (updatedUser.groups?.includes(createdGroup.id)) {
				return SendSuccessPayloadResponse({
					res,
					status: Status.Created,
					payload: {
						...GroupCreatedSuccess,
						response: {
							group: createdGroup,
						},
						status: 'Created',
					},
				})
			} else {
				return SendErrorResponse({
					context: AppContext.Group,
					failReason: FailReason.GroupCreationError,
					jobStatus: 'FAILED',
					jobType: JobType.GetGroupForUser,
					message: 'Something went wrong during group creation',
					res,
					status: Status.InternalServerError,
				})
			}
		})
		.catch(() =>
			SendErrorResponse({
				context: AppContext.Group,
				failReason: FailReason.GroupCreationError,
				jobStatus: 'FAILED',
				jobType: JobType.GetGroupForUser,
				message: `Something went wrong during group creation`,
				res,
				status: Status.InternalServerError,
			}),
		)
}
export const joinGroup = async (req: Request, res: Response) => {
	const { groupId = null, userId = null } = req.body

	if (!groupId || !userId) {
		return SendErrorResponse({
			context: AppContext.Group,
			failReason: FailReason.GroupJoiningError,
			jobStatus: 'FAILED',
			jobType: JobType.JoinGroup,
			message: 'Wrong payload',
			res,
			status: Status.BadRequest,
		})
	}
}
export const leaveGroup = async (req: Request, res: Response) => {
	const { groupId = null, userId = null } = req.body

	if (!groupId || !userId) {
		return SendErrorResponse({
			context: AppContext.Group,
			failReason: FailReason.GroupLeavingError,
			jobStatus: 'FAILED',
			jobType: JobType.LeaveGroup,
			message: 'Wrong payload',
			res,
			status: Status.BadRequest,
		})
	}
}
export const getByGroupdId = async (req: Request, res: Response) => { }
export const updateGroupById = async (req: Request, res: Response) => { }
export const deleteGroupById = async (req: Request, res: Response) => {
	const groupId = req.params.groupId
	const organizerId = req.body.organizerId

	const group = await GroupModel.find({ id: { $eq: groupId }, organizer: { $eq: organizerId } })

	if (group) {
		await GroupModel.findByIdAndDelete(groupId)
			.exec()
			.then(() =>
				SendSuccessPayloadResponse({
					res,
					status: Status.Ok,
					payload: {
						...GroupDeletedSuccess,
						status: 'Deleted',
					},
				}),
			)
			.catch((e) =>
				SendErrorResponse({
					context: AppContext.Group,
					failReason: FailReason.GroupDeletionError,
					jobStatus: 'FAILED',
					jobType: JobType.DeleteGroup,
					message: `Something went wrong during group deletion`,
					res,
					status: Status.InternalServerError,
				}),
			)
	} else {
		return SendErrorResponse({
			context: AppContext.Group,
			failReason: FailReason.GroupDeletionError,
			jobStatus: 'FAILED',
			jobType: JobType.DeleteGroup,
			message: 'Only organizer can delete the group',
			res,
			status: Status.BadRequest,
		})
	}
}

export default {
	createGroup,
	deleteGroupById,
	getAllGroups,
	getAllGroupsForUserId,
	getByGroupdId,
	joinGroup,
	leaveGroup,
	updateGroupById,
}

import Group from '../schemas/Group'
import { Request, Response } from 'express'
import { ActivityCreatedSuccess, ParticipantAlreadyRegistered, ParticipantSuccessfullyRegistered, SendResponse, Status } from '../utils/responses'

export const getAllGroups = async (req: Request, res: Response) => {
    const groups = await Group.find()
    return SendResponse(res, Status.Ok, { results: groups })
}
export const createGroup = async (req: Request, res: Response) => { }
export const getByGroupdId = async (req: Request, res: Response) => { }
export const updateGroupById = async (req: Request, res: Response) => { }
export const deleteGroupById = async (req: Request, res: Response) => { }
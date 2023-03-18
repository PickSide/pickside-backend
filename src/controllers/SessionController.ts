import Session from '../models/Session'
import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { MessageResponse, SendResponse, Status } from '../utils/responses'
import { getSecrets } from '../utils/secrets'

interface SessionProps {
	accountId?: string
	connectedUserId?: string
	accessToken: string
}

export const SESSION_TTL = Math.floor(Date.now() / 1000) + 60 * 60

export const get = async (req: Request, res: Response) => {}
export const create = async (req: Request, res: Response) => {
	const data = req.body.data
	return createSession(data)
}
export const update = async (req: Request, res: Response) => {
	// Not implemented
}
export const remove = async (req: Request, res: Response) => {
	// Not implemented
}

async function createSession(data: SessionProps) {
	const accessToken = sign({ expiresIn: SESSION_TTL }, 'secret')
	const sessionType = data.connectedUserId && data.accountId ? 'authenticated' : 'guest'
	return await Session.create({ ...data, accessToken, sessionStart: Date.now(), sessionEnd: SESSION_TTL, sessionType })
}

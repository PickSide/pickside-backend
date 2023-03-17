import Account from '../models/Account'
import { Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { getSecrets } from '../utils/secrets'
import { DefaultServerResponseMap, MessageResponse, SendResponse, Status } from '../utils/responses'
import { omit, pick } from 'lodash'

export const authenticate = async (req: Request, res: Response) => {
	const { username, password } = req.body.data
	if (!username || !password) {
		return SendResponse(res, Status.BadRequest, MessageResponse(DefaultServerResponseMap[Status.BadRequest]))
	}

	const user = await Account.findOne({ username }).exec()
	if (!user) {
		return SendResponse(res, Status.Unauthorized, MessageResponse(DefaultServerResponseMap[Status.Unauthorized]))
	}

	const match = await compare(password, user.password)
	if (match) {
		const accessToken = generateAT(user.username)
		const refreshToken = generateRT(user.username)
		const cookieToken = req.cookies?.token
		let RT_array = user.refreshTokens

		if (cookieToken) {
			RT_array = user.refreshTokens.filter((rt) => rt !== cookieToken)
		} else {
			RT_array = []
		}

		user.refreshTokens = [...RT_array, refreshToken]
		await user.save()

		res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true })
		res.cookie('token', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })
		SendResponse(res, Status.Ok, { accessToken, connectedUser: user })
	} else {
		SendResponse(res, Status.Unauthorized, MessageResponse(DefaultServerResponseMap[Status.Unauthorized]))
	}
}
export const logout = async (req: Request, res: Response) => {
	const { id: _id } = req.body.data
	const cookieToken = req.cookies
	const user = await Account.findOne({ _id })
	if (!!user) {
		user.refreshTokens = [...user.refreshTokens.filter((token) => token !== cookieToken)]
		await user.save()
	}
	return
}
export const getAccessToken = async (req: Request, res: Response) => {
	const { jwt: refreshToken } = req.cookies
	if (refreshToken === null) {
		SendResponse(res, Status.Unauthorized, MessageResponse(DefaultServerResponseMap[Status.Unauthorized]))
	}
	if (!!(await Account.findOne({ refreshToken: refreshToken }).exec())) {
		SendResponse(res, Status.Forbidden, MessageResponse(DefaultServerResponseMap[Status.Forbidden]))
	}
	verify(refreshToken, getSecrets()['REFRESH_TOKEN_SECRET'], (err, user) => {
		if (err) {
			SendResponse(res, Status.Forbidden, MessageResponse(DefaultServerResponseMap[Status.Forbidden]))
		} else {
			const accessToken = generateAT(user.username)
			SendResponse(
				res,
				Status.Forbidden,
				MessageResponse(DefaultServerResponseMap[Status.Ok], {
					accessToken,
					...pick(user, ['id', 'firstName', 'lastName', 'username']),
				}),
			)
		}
	})
	return
}

function generateAT(username) {
	return sign({ username }, getSecrets()['ACCESS_TOKEN_SECRET'], { expiresIn: '30s' })
}
function generateRT(username) {
	return sign({ username }, getSecrets()['REFRESH_TOKEN_SECRET'], { expiresIn: '1d' })
}

import {
	DefaultServerResponseMap,
	SendResponse,
	Status,
	WrongCredentials,
	addToList,
	isTokenValid,
	revokeToken,
	secrets,
} from '../utils'
import { JsonWebTokenError, JwtPayload, TokenExpiredError, sign, verify } from 'jsonwebtoken'
import { Request, Response } from 'express'
import User, { IUser } from '../schemas/User'
import { omit, pick } from 'lodash'

import VerifiedEmail from '../schemas/Email'
import { compare } from 'bcrypt'

interface TokenClaims extends JwtPayload {
	emailVerified?: boolean
	email?: string
	firstName?: string
	lastName?: string
	username?: string
}

export const getAccessToken = async (req: Request, res: Response) => {
	const user = req.body.data
	const refreshToken = req.headers['authorization']?.split(' ')[1]
	if (!!refreshToken) {
		verify(refreshToken, secrets['REFRESH_TOKEN_SECRET'], async (err) => {
			// if token is expired, invalidate token
			if (!!err) {
				if (err.name === TokenExpiredError.name) {
					await revokeToken(refreshToken)
					return SendResponse(res, Status.Forbidden, DefaultServerResponseMap[Status.Forbidden])
				}
				if (err.name === JsonWebTokenError.name) {
					return SendResponse(res, Status.Unauthorized, DefaultServerResponseMap[Status.Unauthorized])
				}
			}
		})

		//if token is valid
		const tokenValid = await isTokenValid(refreshToken)
		if (tokenValid) {
			const emailVerified = !!(await VerifiedEmail.findOne({ userIdAssociated: user._id }))
			const claims = getTokenClaims(user, emailVerified)
			const accessToken = generateAT(claims)
			return SendResponse(
				res,
				Status.Ok,
				{
					accessToken,
				},
			)
		}
	}
	return SendResponse(res, Status.Unauthorized, DefaultServerResponseMap[Status.Unauthorized])
}

export const login = async (req: Request, res: Response) => {
	const { username: usernameOrEmail, password } = req.body.data
	const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }).populate(['preferredLocale', 'preferredRegion', 'preferredSport', 'eventsRegistered', 'groups']).exec()
	if (!usernameOrEmail || !password || !user) {
		return SendResponse(res, Status.BadRequest, DefaultServerResponseMap[Status.BadRequest])
	}

	const match = await compare(password, user.password)
	if (match) {
		const emailVerified = !!(await VerifiedEmail.findOne({ userIdAssociated: user.id }).exec())
		const claims = getTokenClaims(user, emailVerified)
		const accessToken = generateAT(claims)
		const refreshToken = generateRT(claims)

		await addToList(accessToken)
		await addToList(refreshToken)

		return SendResponse(res, Status.Ok, {
			user: omit(user, ['password']),
			accessToken,
			refreshToken,
		})
	} else {
		return SendResponse(res, Status.Unauthorized, WrongCredentials)
	}
}

export const logout = async (req: Request, res: Response) => {
	const refreshToken = req.headers['authorization']?.split(' ')[1]
	if (refreshToken) {
		await revokeToken(refreshToken)
		return SendResponse(res, Status.Ok, DefaultServerResponseMap[Status.Ok])
	}
	return SendResponse(res, Status.BadRequest)
}

function generateAT(claims) {
	return sign(claims, secrets['ACCESS_TOKEN_SECRET'], { expiresIn: '1h' })
}

function generateRT(claims) {
	return sign(claims, secrets['REFRESH_TOKEN_SECRET'], { expiresIn: '1d' })
}

function getTokenClaims(data, emailVerified: boolean = false): TokenClaims {
	return {
		...pick(data, ['email', 'profile.firstName', 'profile.lastName', 'username']),
		emailVerified,
		iss: 'http://pickside.com',
		sub: data.id,
		//aud: 'http://pickside.com',
	}
}

import Account, { IAccount } from '../models/Account'
import VerifiedEmail from '../models/VerifiedEmail'
import { Request, Response } from 'express'
import { JwtPayload, JsonWebTokenError, sign, TokenExpiredError, verify } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import {
	DefaultServerResponseMap,
	MessageResponse,
	SendResponse,
	Status,
	addToValidTokens,
	isTokenValid,
	revokeToken,
	secrets,
} from '../utils'
import { omit, pick } from 'lodash'

interface TokenClaims extends JwtPayload {
	emailVerified?: boolean
	email?: string
	firstName?: string
	lastName?: string
	username?: string
}

export const authenticate = async (req: Request, res: Response) => {
	const { username, password } = req.body.data
	const user = await Account.findOne({ username }).exec()
	if (!username || !password || !user) {
		return SendResponse(res, Status.BadRequest, MessageResponse(DefaultServerResponseMap[Status.BadRequest]))
	}

	const match = await compare(password, user.password)
	if (match) {
		const emailVerified = !!(await VerifiedEmail.findOne({ usernameAssociated: username }).exec())
		const claims = getTokenClaims(user, emailVerified)
		const accessToken = generateAT(claims)
		const refreshToken = generateRT(claims)

		await addToValidTokens(accessToken)
		await addToValidTokens(refreshToken)

		return SendResponse(res, Status.Ok, {
			user: omit(user.toObject(), ['password', 'username']),
			accessToken,
			refreshToken,
		})
	} else {
		return SendResponse(res, Status.Unauthorized, MessageResponse(DefaultServerResponseMap[Status.Unauthorized]))
	}
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
					return SendResponse(res, Status.Forbidden, MessageResponse(DefaultServerResponseMap[Status.Forbidden]))
				}
				if (err.name === JsonWebTokenError.name) {
					return SendResponse(res, Status.Unauthorized, MessageResponse(DefaultServerResponseMap[Status.Unauthorized]))
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
				MessageResponse(DefaultServerResponseMap[Status.Ok], {
					accessToken,
				}),
			)
		}
	}
	return SendResponse(res, Status.Unauthorized, MessageResponse(DefaultServerResponseMap[Status.Unauthorized]))
}

export const logout = async (req: Request, res: Response) => {
	const { refreshToken } = req.body.data
	await revokeToken(refreshToken)
	return SendResponse(
		res,
		Status.Ok,
	)
}

function generateAT(claims) {
	return sign(claims, secrets['ACCESS_TOKEN_SECRET'], { expiresIn: '1m' })
}

function generateRT(claims) {
	return sign(claims, secrets['REFRESH_TOKEN_SECRET'], { expiresIn: '1d' })
}

function getTokenClaims(data: IAccount, emailVerified: boolean = false): TokenClaims {
	return {
		...pick(data, ['email', 'profile.firstName', 'profile.lastName', 'username']),
		emailVerified,
		iss: 'http://pickside.com',
		sub: data.id,
		//aud: 'http://pickside.com',
	}
}

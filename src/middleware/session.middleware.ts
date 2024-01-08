import {
	AppContext,
	FailReason,
	JobType,
	SendErrorResponse,
	Status,
	addToBlacklist,
	generateAT,
	getTokenClaims,
	isBlackListed,
	secrets,
} from '../utils'
import { NextFunction, Request, Response } from 'express'
import { decode, verify } from 'jsonwebtoken'

import User from '../schemas/User'

export async function validateAccessToken(req: Request, res: Response, next: NextFunction) {
	const { accessToken = null, refreshToken = null } = req.cookies

	if (!refreshToken) {
		return SendErrorResponse({
			context: AppContext.Token,
			failReason: FailReason.TokenError,
			jobStatus: 'FAILED',
			jobType: JobType.GetAccessToken,
			message: 'Token not found, please login',
			res,
			status: Status.Unauthorized,
		})
	}

	if (refreshToken && !accessToken) {
		try {
			const payload = verify(refreshToken, secrets['REFRESH_TOKEN_SECRET'])
			await regenAccessToken(payload, res)
		} catch (e) {
			return SendErrorResponse({
				context: AppContext.Token,
				failReason: FailReason.TokenInvalid,
				jobStatus: 'FAILED',
				jobType: JobType.GetAccessToken,
				message: 'Invalid refresh token, please re-login',
				res,
				status: Status.Unauthorized,
			})
		}
	}

	if (refreshToken && accessToken) {
		try {
			verify(accessToken, secrets['ACCESS_TOKEN_SECRET'])
		} catch (e) {
			const payload = decode(accessToken)
			await regenAccessToken(payload, res)
		}
	}
	next()
}

const regenAccessToken = async (payload, res) => {
	const user = await User.findById(payload?.sub).exec()
	const claims = getTokenClaims(user)
	let newAT = generateAT(claims)

	while (!isBlackListed(newAT)) {
		newAT = generateAT(claims)
	}

	addToBlacklist(newAT)

	res.cookie('accessToken', newAT, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 5000,//300000,
		httpOnly: true,
		sameSite: true
	})
}

export default {
	validateAccessToken,
}

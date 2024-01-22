import { ACCOUNT_TYPE, GOOGLE_USER_PERMISSIONS, ROLES } from '@schemas/User'
import {
	AppContext,
	FailReason,
	JobType,
	SendErrorResponse,
	Status,
	regenAccessToken,
	secrets,
} from '@utils'
import { LocaleModel, UserModel } from '@schemas'
import { NextFunction, Request, Response } from 'express'
import { decode, verify } from 'jsonwebtoken'

import crypto from 'crypto'

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

export async function handleGoogleLogin(req: Request, res: Response, next: NextFunction) {
	const { email, name, locale, picture, verified_email } = req.body.data
	const preferredLocale = await LocaleModel.findOne({ value: locale })
	const username = 'user' + crypto.randomBytes(8).toString('base64')

	let user = await UserModel.findByEmail(email)

	if (!user) {
		user = await UserModel.create({
			accountType: ACCOUNT_TYPE.GOOGLE,
			avatar: picture,
			email,
			emailVerified: verified_email,
			preferredLocale,
			fullName: name,
			username,
			permissions: GOOGLE_USER_PERMISSIONS,
			role: ROLES.USER,
		})
	}

	next(user)
}

export async function handleGuestLogin(req: Request, res: Response, next: NextFunction) {

}

export default {
	validateAccessToken,
	handleGoogleLogin,
	handleGuestLogin
}

import { TokenModel, UserModel } from '@schemas'

import { Response } from 'express'
import { User } from '@schemas/User'
import { pick } from 'lodash'
import { secrets } from './secrets'
import { sign } from 'jsonwebtoken'

const cookieOpts = {
	sameSite: true,
	httpOnly: true,
}

export async function blacklistToken(token: string): Promise<void> {
	await TokenModel.create({ value: token })
}

export function generateAT(claims) {
	return sign(claims, secrets['ACCESS_TOKEN_SECRET'], { expiresIn: '5m' })
}

export function generateRT(claims) {
	return sign(claims, secrets['REFRESH_TOKEN_SECRET'], { expiresIn: '1y' })
}

export async function regenAccessToken(payload, res) {
	const user = await UserModel.findById(payload?.sub).lean().exec()
	const claims = getTokenClaims(user)
	let newAT = generateAT(claims)

	const isTokenBlacklisted = !!(await TokenModel.exists({ value: newAT }).exec())

	while (isTokenBlacklisted) {
		newAT = generateAT(claims)
	}

	await blacklistToken(newAT)

	res.cookie('accessToken', newAT, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 5000,//300000,
		httpOnly: true,
		sameSite: true
	})
}

export async function setRefreshAndAccessTokens(user: User, res: Response) {
	const claims = getTokenClaims(user)
	const accessToken = generateAT(claims)
	const refreshToken = generateRT(claims)

	res.cookie('accessToken', accessToken, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 300000, //5 mins
		...cookieOpts
	})

	res.cookie('refreshToken', refreshToken, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 3.154e10, //1 year
		...cookieOpts
	})

	await blacklistToken(accessToken)
	await blacklistToken(refreshToken)
}


export function getTokenClaims(user: any) {
	return {
		...pick(user, ['email', 'fullName', 'username']),
		iss: 'https://pickside.net',
		sub: user?.id,
	}
}

export default {
	generateAT,
	generateRT,
	regenAccessToken,
	setRefreshAndAccessTokens,
	getTokenClaims
}

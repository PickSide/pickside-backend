import Token from '../schemas/Token'
import { pick } from 'lodash'
import { secrets } from './secrets'
import { sign } from 'jsonwebtoken'

export async function addToBlacklist(token: string): Promise<void> {
	await Token.create({ value: token })
}

export async function isBlackListed(token: string): Promise<boolean> {
	return !!(await Token.findOne({ value: token }).exec())
}

export async function revokeToken(token: string): Promise<boolean> {
	return !!(await Token.findOneAndDelete({ value: token }).exec())
}

export function generateAT(claims) {
	return sign(claims, secrets['ACCESS_TOKEN_SECRET'], { expiresIn: '5m' })
}

export function generateRT(claims) {
	return sign(claims, secrets['REFRESH_TOKEN_SECRET'], { expiresIn: '1y' })
}

export function getTokenClaims(user: any) {
	return {
		...pick(user, ['email', 'profile.firstName', 'profile.lastName', 'username']),
		iss: 'https://pickside.net',
		sub: user?.id,
	}
}

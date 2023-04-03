import RevokedToken from '../models/RevokedToken'
import ValidToken from '../models/ValidToken'

export async function addToValidTokens(token: string): Promise<void> {
	await ValidToken.create({ value: token })

	return
}

export async function isTokenValid(token: string): Promise<boolean> {
	const isTokenRevoked = !!(await RevokedToken.findOne({ value: token }).exec())
	const isTokenValid = !!(await ValidToken.findOne({ value: token }).exec())

	return !isTokenRevoked && isTokenValid
}

export async function revokeToken(token: string): Promise<void> {
	await ValidToken.findOneAndDelete({ value: token }).exec()

	const revokedTokenExists = await RevokedToken.findOne({ value: token })

	if (!revokedTokenExists) {
		await RevokedToken.create({ value: token })
	}

	return
}

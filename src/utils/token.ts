import Token from '../schemas/Token'

export async function addToList(token: string): Promise<void> {
	await Token.create({ value: token })
	return
}

export async function isTokenValid(token: string): Promise<boolean> {
	return !!(await Token.findOne({ value: token }).exec())
}

export async function revokeToken(token: string): Promise<boolean> {
	return !!(await Token.findOneAndDelete({ value: token }).exec())
}

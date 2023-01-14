import { Secret } from 'jsonwebtoken'

export function getSecrets() {
	return {
		ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as Secret,
		REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as Secret,
	}
}

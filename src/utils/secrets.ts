import { Secret } from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const secrets = {
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as Secret,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as Secret,
}

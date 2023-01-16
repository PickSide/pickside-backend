import User from '../models/User'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { getSecrets } from '../utils/secrets'
import { Status, SendStatusOnly, SendStatusWithMessage } from '../utils/responses'

const handleLogin = async (req: Request, res: Response) => {
	const cookies = req.cookies
	console.log(`cookie available at login: ${JSON.stringify(cookies)}`)
	const { username, password } = req.body

	if (!username || !password) {
		return SendStatusWithMessage(res, Status.BadRequest, 'Username and password are required.')
	}

	const foundUser = await User.findOne({ username }).exec()

	console.log(foundUser)

	if (!foundUser) {
		return SendStatusWithMessage(res, Status.Unauthorized, 'Username or password incorrect.')
	}

	const match = await compare(password, foundUser.password)

	if (match) {
		//const roles = Object.values(foundUser.roles).filter(Boolean)
		// create JWTs
		const accessToken = sign(
			{
				UserInfo: {
					username: foundUser.username,
					//roles: roles,
				},
			},
			getSecrets()['ACCESS_TOKEN_SECRET'],
			{ expiresIn: '10s' },
		)
		const newRefreshToken = sign({ username: foundUser.username }, getSecrets()['REFRESH_TOKEN_SECRET'], {
			expiresIn: '1d',
		})

		// Changed to let keyword
		let newRefreshTokenArray = !cookies?.jwt
			? foundUser.refreshToken
			: foundUser.refreshToken.filter((rt) => rt !== cookies.jwt)

		if (cookies?.jwt) {
			/* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when username logs in
            */
			const refreshToken = cookies.jwt
			const foundToken = await User.findOne({ refreshToken }).exec()

			// Detected refresh token reuse!
			if (!foundToken) {
				console.log('attempted refresh token reuse at login!')
				// clear out ALL previous refresh tokens
				newRefreshTokenArray = []
			}

			res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
		}

		// Saving refreshToken with current username
		foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
		const result = await foundUser.save()
		console.log(result)

		// Creates Secure Cookie with refresh token
		res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })

		// Send authorization roles and access token to username
		res.json({ accessToken, connectedUser: foundUser })
	} else {
		SendStatusOnly(res, Status.Unauthorized)
	}
}

export default {
	handleLogin,
}

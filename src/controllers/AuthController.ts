import User from '../models/User'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { getSecrets } from '../utils/secrets'
import { SendResponse, Status } from '../utils/responses'

const handleLogin = async (req: Request, res: Response) => {
	const cookies = req.cookies
	const { username, password } = req.body

	if (!username || !password) {
		return SendResponse(res, Status.BadRequest, 'Username and password are required.')
	}

	const user = await User.findOne({ username }).exec()

	console.log(user)

	if (!user) {
		return SendResponse(res, Status.Unauthorized, 'Username or password incorrect.')
	}

	const match = await compare(password, user.password)

	if (match) {
		const accessToken = sign(
			{
				UserInfo: {
					username: user.username,
					//roles: roles,
				},
			},
			getSecrets()['ACCESS_TOKEN_SECRET'],
			{ expiresIn: '10s' },
		)
		const newRefreshToken = sign({ username: user.username }, getSecrets()['REFRESH_TOKEN_SECRET'], {
			expiresIn: '1d',
		})

		let newRefreshTokenArray = !cookies?.jwt
			? user.refreshToken
			: user.refreshToken.filter((rt) => rt !== cookies.jwt)

		if (cookies?.jwt) {
			const refreshToken = cookies.jwt
			const foundToken = await User.findOne({ refreshToken }).exec()

			if (!foundToken) {
				console.log('attempted refresh token reuse at login!')
				newRefreshTokenArray = []
			}

			res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
		}

		user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
		await user.save()

		res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })
		SendResponse(res, Status.Ok, { accessToken, connectedUser: user })
	} else {
		SendResponse(res, Status.Unauthorized)
	}
}

export default {
	handleLogin,
}

import User from '../models/User'
import jwt from 'jsonwebtoken'
import { getSecrets } from '../utils/secrets'

const handleRefreshToken = async (req: any, res: any) => {
	const cookies = req.cookies
	if (!cookies?.jwt) {
		return res.SendStatusWithMessage(401)
	}

	const refreshToken = cookies.jwt
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

	const foundUser = await User.findOne({ refreshToken }).exec()

	if (!foundUser) {
		jwt.verify(refreshToken, getSecrets['REFRESH_TOKEN_SECRET'], async (err, decoded) => {
			if (err) return res.SendStatusWithMessage(403) //Forbidden
			console.log('attempted refresh token reuse!')
			const hackedUser = await User.findOne({ username: decoded.username }).exec()
			hackedUser ? (hackedUser.refreshToken = []) : hackedUser
			const result = await hackedUser?.save()
			console.log(result)
		})
		return res.SendStatusWithMessage(403) //Forbidden
	}

	const newRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken)

	jwt.verify(refreshToken, getSecrets['REFRESH_TOKEN_SECRET'], async (err, decoded) => {
		if (err) {
			console.log('expired refresh token')
			foundUser.refreshToken = [...newRefreshTokenArray]
			const result = await foundUser.save()
			console.log(result)
		}
		if (err || foundUser.username !== decoded.username) return res.SendStatusWithMessage(403)

		// Refresh token was still valid
		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: decoded.username,
				},
			},
			getSecrets['ACCESS_TOKEN_SECRET'],
			{ expiresIn: '10s' },
		)

		const newRefreshToken = jwt.sign({ username: foundUser.username }, getSecrets['REFRESH_TOKEN_SECRET'], {
			expiresIn: '1d',
		})
		// Saving refreshToken with current user
		foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
		const result = await foundUser.save()

		// Creates Secure Cookie with refresh token
		res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

		res.json({ accessToken })
	})
}

export default {
	handleRefreshToken,
}

import User from '../models/User'
import jwt from 'jsonwebtoken'
import { getSecrets } from '../utils/secrets'
import { MessageResponse, SendResponse, Status } from '../utils/responses'

const handleRefreshToken = async (req: any, res: any) => {
	const cookies = req.cookies
	if (!cookies?.jwt) {
		return SendResponse(res, Status.Unauthorized, MessageResponse('Unauthorized'))
	}

	const refreshToken = cookies.jwt
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

	const foundUser = await User.findOne({ refreshToken }).exec()

	if (!foundUser) {
		jwt.verify(refreshToken, getSecrets['REFRESH_TOKEN_SECRET'], async (err, decoded) => {
			if (err) {
				return SendResponse(res, Status.Forbidden, MessageResponse('Forbidden'))
			}
			const hackedUser = await User.findOne({ username: decoded.username }).exec()
			hackedUser ? (hackedUser.refreshToken = []) : hackedUser
			await hackedUser?.save()
		})
		return SendResponse(res, Status.Forbidden, MessageResponse('Forbidden'))
	}

	const newRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken)

	jwt.verify(refreshToken, getSecrets['REFRESH_TOKEN_SECRET'], async (err, decoded) => {
		if (err) {
			foundUser.refreshToken = [...newRefreshTokenArray]
			await foundUser.save()
		}

		if (err || foundUser.username !== decoded.username) {
			return SendResponse(res, Status.Forbidden, MessageResponse('Forbidden'))
		}

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

		foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
		await foundUser.save()


		res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
		res.json({ accessToken })
	})
}

export default {
	handleRefreshToken,
}

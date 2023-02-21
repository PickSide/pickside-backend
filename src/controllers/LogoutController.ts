import jwt from 'jsonwebtoken'
import User from '../models/User'
import { MessageResponse, SendResponse, Status } from '../utils/responses'

const handleLogout = async (req, res) => {
	const cookies = req.cookies
	if (!cookies?.jwt) {
		return SendResponse(res, Status.NoContent, MessageResponse('No content'))
	}
	const refreshToken = cookies.jwt

	const foundUser = await User.findOne({ refreshToken }).exec()
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
		return SendResponse(res, Status.NoContent, MessageResponse('No content'))
	}

	// Delete refreshToken in db
	foundUser.refreshToken = foundUser.refreshToken.filter((rt) => rt !== refreshToken)
	await foundUser.save()

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
	return SendResponse(res, Status.NoContent, MessageResponse('No content'))
}

export default {
	handleLogout,
}

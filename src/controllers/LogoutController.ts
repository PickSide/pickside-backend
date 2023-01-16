import jwt from 'jsonwebtoken'
import User from '../models/User'

const handleLogout = async (req, res) => {
	// On client, also delete the accessToken

	const cookies = req.cookies
	if (!cookies?.jwt) return res.SendStatusWithMessage(204) //No content
	const refreshToken = cookies.jwt

	// Is refreshToken in db?
	const foundUser = await User.findOne({ refreshToken }).exec()
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
		return res.SendStatusWithMessage(204)
	}

	// Delete refreshToken in db
	foundUser.refreshToken = foundUser.refreshToken.filter((rt) => rt !== refreshToken)
	const result = await foundUser.save()
	console.log(result)

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
	res.SendStatusWithMessage(204)
}

export default {
	handleLogout,
}

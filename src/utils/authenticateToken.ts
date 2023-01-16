import { verify } from 'jsonwebtoken'
import { getSecrets } from './secrets'

export function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token === null) {
		return res.SendStatusWithMessage(401)
	}

	verify(token, getSecrets()['ACCESS_TOKEN_SECRET'], (err, user) => {
		if (err) {
			return res.SendStatusWithMessage(403)
		}
		req.user = user
		next()
	})
}

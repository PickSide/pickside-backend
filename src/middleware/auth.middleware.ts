import {
	DefaultServerResponseMap,
	InvalidToken,
	SendSuccessResponse,
	Status,
	isTokenValid,
	revokeToken,
	secrets,
} from '../utils'
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

export function validateAccessToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (!!token) {
		verify(token, secrets['ACCESS_TOKEN_SECRET'], {}, async (err) => {
			if (err?.name === TokenExpiredError.name) {
				await revokeToken(token)
				return SendSuccessResponse(res, Status.Forbidden, DefaultServerResponseMap[Status.Forbidden])
			}
			if (err?.name === JsonWebTokenError.name) {
				return SendSuccessResponse(res, Status.Forbidden, DefaultServerResponseMap[Status.Unauthorized])
			}
			if (!isTokenValid(token)) {
				return SendSuccessResponse(res, Status.Forbidden, InvalidToken)
			}
			next()
		})
	} else {
		return SendSuccessResponse(res, Status.Unauthorized, DefaultServerResponseMap[Status.Unauthorized])
	}
}

import { verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'
import RevokedToken from '../models/RevokedToken'
import ValidToken from '../models/ValidToken'
import {
	DefaultServerResponseMap,
	MessageResponse,
	SendResponse,
	Status,
	secrets,
	isTokenValid,
	revokeToken,
} from '../utils'

export function validateAccessToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	console.log(authHeader)
	if (!!token) {
		verify(token, secrets['ACCESS_TOKEN_SECRET'], {}, async (err) => {
			if (err?.name === TokenExpiredError.name) {
				await revokeToken(token)
				return SendResponse(res, Status.Forbidden, MessageResponse(DefaultServerResponseMap[Status.Forbidden]))
			}
			if (err?.name === JsonWebTokenError.name) {
				return SendResponse(res, Status.Forbidden, MessageResponse(DefaultServerResponseMap[Status.Unauthorized]))
			}
			if (!isTokenValid(token)) {
				return SendResponse(res, Status.Forbidden, MessageResponse('Token not valid.'))
			}
			next()
		})
	} else {
		return SendResponse(res, Status.Unauthorized, MessageResponse(DefaultServerResponseMap[Status.Unauthorized]))
	}
}

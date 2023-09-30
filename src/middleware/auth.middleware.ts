import {
	AppContext,
	DefaultServerResponseMap,
	FailReason,
	SendErrorResponse,
	SendResponse,
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

				return SendErrorResponse({
					context: AppContext.Token,
					failReason: FailReason.TokenExpired,
					jobStatus: 'FAILED',
					//add dynamic jobtype
					message: 'Forbidden action',
					status: Status.Unauthorized,
					res,
				})
			}
			if (err?.name === JsonWebTokenError.name) {
				return SendErrorResponse({
					context: AppContext.Token,
					failReason: FailReason.TokenError,
					jobStatus: 'FAILED',
					//add dynamic jobtype
					message: 'Forbidden action',
					status: Status.Unauthorized,
					res,
				})
			}
			if (!isTokenValid(token)) {
				return SendErrorResponse({
					context: AppContext.Token,
					failReason: FailReason.TokenInvalid,
					jobStatus: 'FAILED',
					//add dynamic jobtype
					message: 'Forbidden action',
					status: Status.Unauthorized,
					res,
				})
			}
			next()
		})
	} else {
		return SendResponse(res, Status.Unauthorized, DefaultServerResponseMap[Status.Unauthorized])
	}
}

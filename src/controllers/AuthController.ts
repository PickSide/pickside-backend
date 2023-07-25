import {
	AppContext,
	DefaultServerResponseMap,
	FailReason,
	JobType,
	SendErrorResponse,
	SendResponse,
	SendSuccessPayloadResponse,
	Status,
	addToList,
	isTokenValid,
	revokeToken,
	secrets,
} from '../utils'
import { JsonWebTokenError, JwtPayload, TokenExpiredError, decode, sign, verify } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { omit, pick } from 'lodash'

import User from '../schemas/User'
import VerifiedEmail from '../schemas/Email'
import { compare } from 'bcrypt'
import nodemailer from 'nodemailer'

interface TokenClaims extends JwtPayload {
	emailVerified?: boolean
	email?: string
	firstName?: string
	lastName?: string
	username?: string
}

export const getAccessToken = async (req: Request, res: Response) => {
	const user = req.body.data
	const refreshToken = req.headers['authorization']?.split(' ')[1]
	if (!!refreshToken) {
		verify(refreshToken, secrets['REFRESH_TOKEN_SECRET'], async (err) => {
			// if token is expired, invalidate token
			if (!!err) {
				if (err.name === TokenExpiredError.name) {
					await revokeToken(refreshToken)
					return SendErrorResponse({
						context: AppContext.User,
						failReason: FailReason.TokenExpired,
						jobStatus: 'FAILED',
						jobType: JobType.GetAccessToken,
						message: 'Token expired. Please relogin',
						res,
						status: Status.Forbidden,
					})
				}
				if (err.name === JsonWebTokenError.name) {
					return SendErrorResponse({
						context: AppContext.User,
						failReason: FailReason.TokenError,
						jobStatus: 'FAILED',
						jobType: JobType.GetAccessToken,
						message: 'Unauthorized action.',
						res,
						status: Status.Unauthorized,
					})
				}
			}
		})

		//if token is valid
		const tokenValid = await isTokenValid(refreshToken)
		if (tokenValid) {
			const emailVerified = !!(await VerifiedEmail.findOne({ userIdAssociated: user._id }))
			const claims = getTokenClaims(user, emailVerified)
			const accessToken = generateAT(claims)
			return SendResponse(res, Status.Ok, {
				accessToken,
			})
		}
	}
	return SendResponse(res, Status.Unauthorized, DefaultServerResponseMap[Status.Unauthorized])
}

export const loginWithGoogle = async (req: Request, res: Response) => {
	const { email, family_name, given_name, locale, picture, verified_email } = req.body.data


	let user = await User.findOne({ email })

	if (!user) {
		user = await User.create({
			avatar: picture,
			email,
			emailVerified: verified_email,
			firstName: given_name,
			lastName: family_name,
			isExternalAccount: true,
		})
	}

	if (user.inactive) {
		sendActivationEmail(user)

		return SendErrorResponse({
			context: AppContext.User,
			extra: { userId: user.id },
			failReason: FailReason.UserInactive,
			jobStatus: 'FAILED',
			jobType: JobType.Login,
			message: 'This user is inactive.',
			res,
			status: Status.Unauthorized,
		})
	}

	const claims = getTokenClaims(user, verified_email)
	const accessToken = generateAT(claims)
	const refreshToken = generateRT(claims)

	await addToList(accessToken)
	await addToList(refreshToken)

	return SendSuccessPayloadResponse({
		res,
		status: Status.Ok,
		payload: {
			user: omit(user, ['password']),
			accessToken,
			refreshToken,
		}
	})

}

export const login = async (req: Request, res: Response) => {
	const { username: usernameOrEmail, password } = req.body.data
	const user = await User
		.findOne({
			$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
		})
		.populate([
			'preferredLocale',
			'preferredRegion',
			'preferredSport',
			'groups'
		])
		.exec()

	const match = await compare(password, user?.password)

	if (!usernameOrEmail || !password || !user || !match) {
		return SendErrorResponse({
			context: AppContext.User,
			failReason: FailReason.UserWrongCredentials,
			jobStatus: 'FAILED',
			jobType: JobType.Login,
			message: 'Username/Email or Password is incorrect.',
			res,
			status: Status.Unauthorized,
		})
	}

	if (user.inactive) {
		sendActivationEmail(user)

		return SendErrorResponse({
			context: AppContext.User,
			extra: { userId: user.id },
			failReason: FailReason.UserInactive,
			jobStatus: 'FAILED',
			jobType: JobType.Login,
			message: 'This user is inactive.',
			res,
			status: Status.Unauthorized,
		})
	}
	const emailVerified = !!(await VerifiedEmail.findOne({ userIdAssociated: user.id }).exec())
	const claims = getTokenClaims(user, emailVerified)
	const accessToken = generateAT(claims)
	const refreshToken = generateRT(claims)

	await addToList(accessToken)
	await addToList(refreshToken)

	return SendResponse(res, Status.Ok, {
		user: omit(user, ['password']),
		accessToken,
		refreshToken,
	})
}

export const logout = async (req: Request, res: Response) => {
	const refreshToken = req.headers['authorization']?.split(' ')[1]
	if (refreshToken) {
		await revokeToken(refreshToken)
		return SendResponse(res, Status.Ok, DefaultServerResponseMap[Status.Ok])
	}
	return SendErrorResponse({
		context: AppContext.User,
		failReason: FailReason.UserLogout,
		jobStatus: 'FAILED',
		jobType: JobType.Logout,
		message: 'Error while logging out.',
		res,
		status: Status.BadRequest,
	})
}

function generateAT(claims) {
	return sign(claims, secrets['ACCESS_TOKEN_SECRET'], { expiresIn: '1h' })
}

function generateRT(claims) {
	return sign(claims, secrets['REFRESH_TOKEN_SECRET'], { expiresIn: '1d' })
}

function getTokenClaims(data, emailVerified: boolean = false): TokenClaims {
	return {
		...pick(data, ['email', 'profile.firstName', 'profile.lastName', 'username']),
		emailVerified,
		iss: 'http://pickside.com',
		sub: data.id,
		//aud: 'http://pickside.com',
	}
}

function sendActivationEmail(user) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'picksideapp@gmail.com',
			pass: process.platform === 'darwin' ? 'fkhureqaynxlqidm' : 'cdjbjfhooqyivsxi',
		},
	})

	const mailOptions = {
		from: process.env.PICKSIDE_EMAIL,
		to: user.email,
		subject: '[ACTION-REQUIRED] - Reactivating your Pickside account',
		html: `
			<p>
				Hey there, we received notice tht you would like to reactivate your Pickside account
				If you still wish to do so, please click on this redirection link: 
				https://pickside.net/api/v1/users/reactivate/${user.id}
				http://localhost:8000/api/v1/users/reactivate/${user.id}
			</p>
		`,
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
		}
	})
}
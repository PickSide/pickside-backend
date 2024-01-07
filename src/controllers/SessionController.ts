import {
	AppContext,
	FailReason,
	JobType,
	SendErrorResponse,
	SendSuccessPayloadResponse,
	SendSuccessResponseMessage,
	Status,
	addToBlacklist,
	generateAT,
	generateRT,
	getTokenClaims,
} from '../utils'
import { Request, Response } from 'express'
import User, { ACCOUNT_TYPE, GOOGLE_USER_PERMISSIONS, GUEST_USER_PERMISSIONS, ROLES } from '../schemas/User'

import Locale from '../schemas/Locale'
import { compare } from 'bcrypt'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { omit } from 'lodash'

export const loginWithGoogle = async (req: Request, res: Response) => {
	const { email, name, locale, picture, verified_email } = req.body.data

	let user = await User.findOne({ email })

	const preferredLocale = await Locale.findOne({ value: locale })
	const username = 'user' + crypto.randomBytes(8).toString('base64')

	if (!user) {
		user = await User.create({
			accountType: ACCOUNT_TYPE.GOOGLE,
			avatar: picture,
			email,
			emailVerified: verified_email,
			preferredLocale,
			fullName: name,
			username,
			permissions: GOOGLE_USER_PERMISSIONS,
			role: ROLES.USER,
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

	const claims = getTokenClaims(user)
	const accessToken = generateAT(claims)
	const refreshToken = generateRT(claims)

	res.cookie('accessToken', accessToken, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 300000, //5 mins
		httpOnly: true,
	})

	res.cookie('refreshToken', refreshToken, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 3.154e10, //1 year
		httpOnly: true,
	})

	await addToBlacklist(accessToken)
	await addToBlacklist(refreshToken)

	return SendSuccessPayloadResponse({
		context: AppContext.User,
		jobType: JobType.Login,
		payload: {
			user: omit(user, ['password']),
			accessToken,
			refreshToken,
		},
		redirectUri: '/',
		res,
		status: Status.Ok,
	})
}

export const login = async (req: Request, res: Response) => {
	const { username: usernameOrEmail, password } = req.body.data
	const user = await User.findOne({
		$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
	})
		.populate(['preferredLocale', 'preferredRegion', 'preferredSport', 'groups'])
		.exec()

	if (!usernameOrEmail || !password || !user) {
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

	const match = await compare(password, user?.password)

	if (!match) {
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

	const claims = getTokenClaims(user)
	const refreshToken = generateRT(claims)
	const accessToken = generateAT(claims)

	addToBlacklist(refreshToken)
	addToBlacklist(accessToken)

	res.cookie('accessToken', accessToken, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 5000,//300000, //5 mins
		httpOnly: true,
	})

	res.cookie('refreshToken', refreshToken, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 3.154e10, //1 year
		httpOnly: true,
	})

	delete user['password']

	return SendSuccessPayloadResponse({
		context: AppContext.User,
		jobType: JobType.Login,
		payload: { user },
		redirectUri: '/',
		res,
		status: Status.Ok,
	})
}

export const loginAsGuest = async (req: Request, res: Response) => {
	const username = 'guest' + crypto.randomBytes(8).toString('base64')

	const guestUser = new User({
		accountType: ACCOUNT_TYPE.GUEST,
		permissions: GUEST_USER_PERMISSIONS,
		username,
	})

	const claims = getTokenClaims(guestUser)
	const accessToken = generateAT(claims)
	const refreshToken = generateRT(claims)

	res.cookie('accessToken', accessToken, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 300000, //5 mins
		httpOnly: true,
	})

	res.cookie('refreshToken', refreshToken, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 3.154e10, //1 year
		httpOnly: true,
	})

	return SendSuccessPayloadResponse({
		context: AppContext.User,
		jobType: JobType.Login,
		payload: { user: guestUser, accessToken, refreshToken },
		redirectUri: '/',
		res,
		status: Status.Ok,
	})
}

export const logout = async (req: Request, res: Response) => {
	res.clearCookie('accessToken')
	res.clearCookie('refreshToken')

	return SendSuccessResponseMessage({
		context: AppContext.User,
		jobType: JobType.Logout,
		message: 'Successfully logged out',
		redirectUri: '/login',
		res,
		status: Status.Ok,
	})
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

export default {
	login,
	loginAsGuest,
	loginWithGoogle,
	logout,
}

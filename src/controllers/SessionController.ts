import { ACCOUNT_TYPE, GOOGLE_USER_PERMISSIONS, GUEST_USER_PERMISSIONS, ROLES, User } from '@schemas/User'
import {
	AppContext,
	FailReason,
	JobType,
	SendErrorResponse,
	SendSuccessPayloadResponse,
	SendSuccessResponseMessage,
	Status,
} from '@utils'
import { LocaleModel, OnlineUserModel, UserModel } from '@schemas'
import { Request, Response } from 'express'

import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { setRefreshAndAccessTokens } from '@utils/token'

export const login = async (req: Request, res: Response) => {
	const { username: usernameOrEmail, password } = req.body.data

	const user = await UserModel
		.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] })
		.exec()

	if (!user || !user.validatePassword(password)) {
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

	await setRefreshAndAccessTokens(user, res)
	await OnlineUserModel.addAsOnlineIfNotPresent(user)

	return SendSuccessPayloadResponse({
		context: AppContext.User,
		jobType: JobType.Login,
		payload: { result: user },
		redirectUri: '/',
		res,
		status: Status.Ok,
	})
}

export const loginWithGoogle = async (req: Request, res: Response) => {
	const { email, name, locale, picture, verified_email } = req.body.data
	const preferredLocale = await LocaleModel.findOne({ value: locale })
	const username = 'user' + crypto.randomBytes(8).toString('base64')

	let user = await UserModel.findByEmail(email)

	if (!user) {
		user = await UserModel.create({
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

	await setRefreshAndAccessTokens(user, res)
	await OnlineUserModel.addAsOnlineIfNotPresent(user)

	return SendSuccessPayloadResponse({
		context: AppContext.User,
		jobType: JobType.Login,
		payload: { result: user },
		redirectUri: '/',
		res,
		status: Status.Ok,
	})
}

export const loginAsGuest = async (req: Request, res: Response) => {
	const username = 'guest' + crypto.randomBytes(8).toString('base64')

	const guestUser = new UserModel({
		accountType: ACCOUNT_TYPE.GUEST,
		permissions: GUEST_USER_PERMISSIONS,
		username,
	})

	await setRefreshAndAccessTokens(guestUser, res)
	await OnlineUserModel.addAsOnlineIfNotPresent(guestUser)

	return SendSuccessPayloadResponse({
		context: AppContext.User,
		jobType: JobType.Login,
		payload: { result: guestUser },
		redirectUri: '/',
		res,
		status: Status.Ok,
	})
}

export const logout = async (req: Request, res: Response) => {
	const { userId = null } = req.body.data

	res.clearCookie('accessToken')
	res.clearCookie('refreshToken')

	const user = await UserModel.findById(userId).exec()

	if (!user) {
		return SendErrorResponse({
			context: AppContext.User,
			failReason: FailReason.UserLogout,
			jobStatus: 'FAILED',
			jobType: JobType.Logout,
			message: 'Something went wrong logging out. Please refresh your page.',
			res,
			status: Status.BadRequest,
		})
	}

	await OnlineUserModel.removeIfPresent(user)

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

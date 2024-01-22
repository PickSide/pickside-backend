import User, { ACCOUNT_TYPE, DEFAULT_USER_PERMISSIONS, ROLES } from '../schemas/User'

import { UserModel } from '@schemas'
import { hashSync } from 'bcrypt'

interface UserProps {
	fullName: string
	username: string
	preferredLocale: any
	preferredSport: any
}

export function createUser(props: UserProps[]) {
	return Promise.all(
		props.map(
			async ({ fullName, username, preferredLocale, preferredSport }) =>
				await UserModel.create({
					accountType: ACCOUNT_TYPE.DEFAULT,
					attendedEventsCount: 0,
					avatar: undefined,
					bio: 'A bio',
					city: 'string',
					email: `${username}@gmail.com`,
					fullName,
					fitnessLevel: 'average',
					joinDate: new Date().toISOString(),
					localeRegion: 'montreal',
					locationCommonlyPlayedIn: 'montreal',
					matchOrganizedCount: 0,
					matchPlayedCount: 0,
					password: hashSync('123', 10),
					phone: '514-966-8481',
					preferredLocale,
					preferredSport,
					preferredTheme: 'light',
					profilePrivacy: {
						allowLocationTracking: false,
						showAge: false,
						showEmail: false,
						showPhone: false,
						showGroups: false,
					},
					reasonsForJoining: [],
					reliability: _rand(100),
					role: ROLES.USER,
					sexe: 'male',
					socialNetworks: [],
					subscriptionType: 'none',
					timezone: 'string',
					username,
					zip: 'h8x302',
				}),
		),
	)
}

function _rand(max) {
	return Math.floor(Math.random() * max) + 1
}

export function _toCoordsObj(lat, lng) {
	return { lat, lng }
}

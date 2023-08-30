import Playable from '../schemas/Court'
import { Types } from 'mongoose'
import User from '../schemas/User'
import { hashSync } from 'bcrypt'

interface UserProps {
	email?: string
	fullName: string
	username: string
	preferredLocale: any
	preferredRegion: any
	preferredSport: any
}

interface PlayablesProps {
	districtCode: string
	type: string
	coords: any
	fieldName: string
	schedule: any
	available: boolean
	isMultisportZone: boolean
}

export function createUser(props: UserProps[]) {
	return Promise.all(
		props.map(
			async ({ email, fullName, username, preferredLocale, preferredRegion, preferredSport }) =>
				await User.create({
					attendedEventsCount: 0,
					avatar: undefined,
					bio: 'A bio',
					city: 'string',
					email: email ? email : `t${fullName.trim()}@gmail.com`,
					fullName,
					fitnessLevel: 'average',
					groups: [],
					isOrganizer: false,
					joinDate: new Date().toISOString(),
					localeRegion: 'montreal',
					locationCommonlyPlayedIn: 'montreal',
					matchOrganizedCount: 0,
					matchPlayedCount: 0,
					password: hashSync('123', 10),
					phone: '514-966-8481',
					preferredLocale,
					preferredRegion,
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

export function createCourt(props: PlayablesProps[]) {
	return Promise.all(
		props.map(
			async ({ available, districtCode, coords, type, fieldName, schedule, isMultisportZone }) =>
				await Playable.create({
					id: new Types.ObjectId(),
					districtCode,
					available,
					coords,
					fieldName,
					schedule,
					type,
					isMultisportZone,
				}),
		),
	)
}

export function getPlayables() {
	return [
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
	]
}

function _rand(max) {
	return Math.floor(Math.random() * max) + 1
}

export function _toCoordsObj(lat, lng) {
	return { lat, lng }
}

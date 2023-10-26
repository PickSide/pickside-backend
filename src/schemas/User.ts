import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export enum ACCOUNT_TYPE {
	GOOGLE = 'google',
	FACEBOOK = 'facebook',
	APPLE = 'apple',
	DEFAULT = 'default',
}

export enum ROLES {
	ADMIN = 'admin',
	USER = 'user',
	GUEST = 'guest',
}

export enum USER_PERMISSIONS {
	ACTIVITIES_VIEW = 'activities-view',
	ACTIVITIES_CREATE = 'activities-create',
	ACTIVITIES_DELETE = 'activities-delete',
	ACTIVITIES_REGISTER = 'activities-register',
	GROUP_CREATE = 'group-create',
	GROUP_DELETE = 'group-delete',
	GROUP_SEARCH = 'group-search',
	USERS_VIEW_ALL = 'see-all-users',
	SEND_MESSAGES = 'send-messages',
	NOTIFICATIONS_SYSTEM_RECEIVE = 'notifications-system-receive',
	NOTIFICATIONS_GLOBAL_RECEIVE = 'notifications-global-receive',
	GOOGLE_SEARCH = 'google-search',
	MAP_VIEW = 'map-view',
}

export enum GROUP_ROLES {
	OWNER = 'owner',
	ADMIN = 'admin',
	MEMBER = 'member',
}

const GUEST_PERMISSIONS = [
	USER_PERMISSIONS.ACTIVITIES_VIEW,
	USER_PERMISSIONS.NOTIFICATIONS_GLOBAL_RECEIVE,
	USER_PERMISSIONS.GOOGLE_SEARCH,
	USER_PERMISSIONS.MAP_VIEW,
]
const REGISTERED_USER = [
	USER_PERMISSIONS.ACTIVITIES_CREATE,
	USER_PERMISSIONS.ACTIVITIES_DELETE,
	USER_PERMISSIONS.ACTIVITIES_REGISTER,
	USER_PERMISSIONS.GROUP_CREATE,
	USER_PERMISSIONS.GROUP_DELETE,
	USER_PERMISSIONS.GROUP_SEARCH,
	USER_PERMISSIONS.NOTIFICATIONS_SYSTEM_RECEIVE,
	USER_PERMISSIONS.SEND_MESSAGES,
]
export const GUEST_USER_PERMISSIONS = GUEST_PERMISSIONS
export const GOOGLE_USER_PERMISSIONS = [...GUEST_PERMISSIONS, ...REGISTERED_USER]
export const FACEBOOK_USER_PERMISSIONS = [...GUEST_PERMISSIONS, ...REGISTERED_USER]
export const APPLE_USER_PERMISSIONS = [...GUEST_PERMISSIONS, ...REGISTERED_USER]
export const DEFAULT_USER_PERMISSIONS = [...GUEST_PERMISSIONS, ...REGISTERED_USER]

export const UserSchema = new Schema(
	{
		accountType: { type: String, require: true },
		attendedEventsCount: { type: String, require: false },
		avatar: { type: String, require: false },
		bio: { type: String, require: false },
		city: { type: String, require: false },
		email: { type: String, require: false },
		emailVerified: { type: Boolean, default: false, require: true },
		favorites: { type: [Schema.Types.ObjectId], ref: 'Activity', require: false },
		fullName: { type: String, require: false },
		fitnessLevel: { type: String, default: 'average', require: false },
		groups: { type: [Schema.Types.ObjectId], ref: 'Group', require: false },
		inactive: { type: Boolean, default: false, require: false },
		inactiveDate: { type: Date, default: null, require: false },
		joinDate: { type: Date, require: false },
		localeRegion: { type: String, require: false },
		locationCommonlyPlayedIn: { type: String, require: true },
		locationTracking: { type: Boolean, default: false, require: false },
		matchOrganizedCount: { type: Number, require: false },
		matchPlayedCount: { type: Number, require: false },
		password: { type: String, require: false },
		permissions: [{ type: String, require: true }],
		phone: { type: String, require: false },
		preferredLocale: { type: Schema.Types.ObjectId, ref: 'Locale', require: false },
		preferredRegion: { type: Schema.Types.ObjectId, ref: 'PredefinedArea', require: false },
		preferredSport: { type: Schema.Types.ObjectId, ref: 'Sport', require: false },
		preferredTheme: { type: String, default: 'light', require: false },
		profilePrivacy: {
			allowLocationTracking: { type: Boolean, default: false, require: false },
			showAge: { type: Boolean, default: true, require: false },
			showEmail: { type: Boolean, default: true, require: false },
			showPhone: { type: Boolean, default: false, require: false },
			showGroups: { type: Boolean, default: true, require: false },
		},
		reasonsForJoining: { type: [String], require: false },
		reliability: { type: Number, require: false },
		role: { type: String, require: true },
		sexe: { type: String, default: 'male', require: false },
		socialNetworks: { type: [String], require: false },
		subscriptionType: { type: String, require: false },
		timezone: { type: String, require: false },
		username: { type: String, require: false },
		zip: { type: String, require: false },
	},
	{
		...schemaProps,
	},
)

export interface IUser extends Document {
	accountType: ACCOUNT_TYPE
	attendedEventsCount: number
	avatar: string
	bio: string
	city: string
	email: string
	emailVerified: boolean
	favorites: any[]
	fullName: string
	fitnessLevel: 'retired' | 'average' | 'athletic' | 'very athletic'
	groups: any[]
	inactive: boolean
	inactiveDate: Date
	joinDate: Date
	localeRegion: string
	locationCommonlyPlayedIn: string
	locationTracking: boolean
	matchOrganizedCount: number
	matchPlayedCount: number
	password: string
	permissions: [USER_PERMISSIONS]
	phone: string
	preferredLocale: any
	preferredRegion: any
	preferredSport: any
	preferredTheme: 'light' | 'dark'
	profilePrivacy: {
		allowLocationTracking: boolean
		showAge: boolean
		showEmail: boolean
		showPhone: boolean
		showGroups: boolean
	}
	reasonsForJoining: string[]
	reliability: number
	sexe: 'male' | 'female'
	socialNetworks: any[]
	subscriptionType: string
	timezone: string
	username: string
	zip: string
}

export default model<IUser>('User', UserSchema)

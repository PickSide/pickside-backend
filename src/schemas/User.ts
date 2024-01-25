import { Document, Model, Schema, model } from 'mongoose'
import { compare, hash, } from 'bcrypt'

import { Activity } from './Activity'
import { Group } from './Group'
import { Sport } from './Sport'
import { schemaProps } from '../utils'

export enum ACCOUNT_TYPE {
	GOOGLE = 'google',
	FACEBOOK = 'facebook',
	APPLE = 'apple',
	DEFAULT = 'default',
	GUEST = 'guest',
}

export enum ROLES {
	ADMIN = 'admin',
	USER = 'user',
}

export enum LOCALES {
	EN = 'en',
	FR = 'fr'
}

export enum SEXES {
	MALE = 'male',
	FEMALe = 'female'
}

export enum THEMES {
	LIGHT = 'light',
	DARK = 'dark'
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
	USERS_VIEW_DETAIL = 'see-detail-users',
	SEND_MESSAGES = 'send-messages',
	NOTIFICATIONS_RECEIVE = 'notifications-receive',
	GOOGLE_SEARCH = 'google-search',
	MAP_VIEW = 'map-view',
}

export enum GROUP_ROLES {
	OWNER = 'owner',
	ADMIN = 'admin',
	MEMBER = 'member',
}

const BASE_PERMISSIONS = [
	USER_PERMISSIONS.ACTIVITIES_VIEW,
	USER_PERMISSIONS.NOTIFICATIONS_RECEIVE,
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
	USER_PERMISSIONS.USERS_VIEW_DETAIL,
	USER_PERMISSIONS.NOTIFICATIONS_RECEIVE,
	USER_PERMISSIONS.SEND_MESSAGES,
]
export const GUEST_USER_PERMISSIONS = BASE_PERMISSIONS
export const GOOGLE_USER_PERMISSIONS = [...BASE_PERMISSIONS, ...REGISTERED_USER]
export const FACEBOOK_USER_PERMISSIONS = [...BASE_PERMISSIONS, ...REGISTERED_USER]
export const APPLE_USER_PERMISSIONS = [...BASE_PERMISSIONS, ...REGISTERED_USER]
export const DEFAULT_USER_PERMISSIONS = [...BASE_PERMISSIONS, ...REGISTERED_USER]

export type ProfilePrivacy = {
	allowLocationTracking?: boolean
	showAge?: boolean
	showEmail?: boolean
	showPhone?: boolean
	showGroups?: boolean
}

export type User = {
	id?: string
	accountType: ACCOUNT_TYPE
	avatar?: string
	bio?: string
	city?: string
	email: string
	emailVerified?: boolean
	favorites?: Activity[]
	fullName: string
	groups?: Group[]
	inactive?: boolean
	inactiveDate?: Date
	joinDate?: Date
	localeRegion?: google.maps.places.PlaceResult
	locationCommonlyPlayedIn?: google.maps.places.PlaceResult
	locationTracking?: boolean
	matchOrganizedCount?: number
	matchPlayedCount?: number
	password: string
	permissions?: USER_PERMISSIONS[]
	phone?: string
	preferredLocale?: LOCALES
	preferredRegion?: google.maps.places.PlaceResult
	preferredSport?: Sport
	preferredTheme?: THEMES
	profilePrivacy?: ProfilePrivacy
	reliability?: number
	role?: ROLES
	sexe: SEXES
	socialNetworks?: any[]
	timezone?: string
	username: string

}

export type UserDocument = User & Document & {
	encryptPassword(pwd: string): Promise<void>
	validatePassword(unhashedPwd: string): boolean
}

export type UserModel = Model<UserDocument> & {
	findByUsername(username: string): Promise<UserDocument>
	findByEmail(email: string): Promise<UserDocument>
	findByEmailAndUsername(email: string, username: string): Promise<UserDocument>
	findByEmailOrUsername(email: string, username: string): Promise<UserDocument>
}

const UserSchema: Schema<UserDocument> = new Schema(
	{
		accountType: { type: String, require: true },
		avatar: { type: String, require: false },
		bio: { type: String, require: false },
		city: { type: String, require: false },
		email: { type: String, require: false },
		emailVerified: { type: Boolean, default: false, require: true },
		favorites: { type: [Schema.Types.ObjectId], ref: 'Activity', require: false },
		fullName: { type: String, require: false },
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
		permissions: { type: [String], enum: USER_PERMISSIONS, default: DEFAULT_USER_PERMISSIONS, require: false },
		phone: { type: String, require: false },
		preferredLocale: { type: Schema.Types.ObjectId, ref: 'Locale', require: false },
		preferredSport: { type: Schema.Types.ObjectId, ref: 'Sport', require: false },
		preferredTheme: { type: String, default: 'light', require: false },
		preferredRegion: { type: String, require: false },
		profilePrivacy: {
			allowLocationTracking: { type: Boolean, default: false, require: false },
			showAge: { type: Boolean, default: true, require: false },
			showEmail: { type: Boolean, default: true, require: false },
			showPhone: { type: Boolean, default: false, require: false },
			showGroups: { type: Boolean, default: true, require: false },
		},
		reliability: { type: Number, require: false },
		role: { type: String, require: true },
		sexe: { type: String, require: false },
		socialNetworks: { type: [String], require: false },
		timezone: { type: String, require: false },
		username: { type: String, require: false },
	},
	{
		...schemaProps,
	},
)

UserSchema.pre('save', async function (next) {
	if (this.isNew) {
		this.password = await hash(this.password, 10)
	}
	next()
})

UserSchema.method('encryptPassword', async function (pwd) {
	this.password = await hash(pwd, 10)
})
UserSchema.method('validatePassword', async function (unhashed) {
	return await compare(unhashed, this.password)
})

export default model<UserDocument, UserModel>('User', UserSchema)

import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export const UserSchema = new Schema(
	{
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
		isExternalAccount: { type: Boolean, default: false, require: true },
		isOrganizer: { type: Boolean, require: false },
		joinDate: { type: Date, require: false },
		localeRegion: { type: String, require: false },
		locationCommonlyPlayedIn: { type: String, require: true },
		locationTracking: { type: Boolean, default: false, require: false },
		matchOrganizedCount: { type: Number, require: false },
		matchPlayedCount: { type: Number, require: false },
		password: { type: String, require: false },
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
	isExternalAccount: boolean
	isOrganizer: boolean
	joinDate: Date
	localeRegion: string
	locationCommonlyPlayedIn: string
	locationTracking: boolean
	matchOrganizedCount: number
	matchPlayedCount: number
	password: string
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

import { Schema, model } from 'mongoose'

export const UserSchema = new Schema(
	{
		attendedEventsCount: { type: String, require: false },
		avatar: { type: Buffer, require: false },
		bio: { type: String, require: false },
		city: { type: String, require: false },
		email: { type: String, require: false },
		eventsRegistered: { type: String, require: false },
		firstName: { type: String, require: false },
		fitnessLevel: { type: String, default: 'average', require: false },
		groups: { type: Schema.Types.ObjectId, ref: 'Group', require: false },
		isOrganizer: { type: Boolean, require: false },
		joinDate: { type: String, require: false },
		lastName: { type: String, require: false },
		localeRegion: { type: String, require: false },
		locationCommonlyPlayedIn: { type: String, require: true },
		locationTracking: { type: Boolean, default: false, require: false },
		matchOrganizedCount: { type: Number, require: false },
		matchPlayedCount: { type: Number, require: false },
		password: { type: String, require: false },
		phone: { type: String, require: false },
		preferredLocale: { type: String, default: 'fr', require: false },
		preferredRegion: { type: String, default: 'light', require: false },
		preferredSport: { type: String, default: 'soccer', require: false },
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
		timestamps: true,
		versionKey: false,
		id: false,
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id
				delete ret._id
				delete ret.__v
				return ret
			},
		},
	},
)

export interface IUser extends Document {
	id: string
	attendedEventsCount: number
	avatar: string
	bio: string
	city: string
	email: string
	eventsRegistered: any[]
	firstName: string
	fitnessLevel: 'retired' | 'average' | 'athletic' | 'very athletic'
	groups: any[]
	isOrganizer: boolean
	joinDate: string
	lastName: string
	localeRegion: string
	locationCommonlyPlayedIn: string
	locationTracking: boolean
	matchOrganizedCount: number
	matchPlayedCount: number
	password: string
	phone: string
	preferredLocale: 'fr' | 'en'
	preferredRegion: string
	preferredSport: string
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
import { Schema } from 'mongoose'

export const AccountSchema = new Schema(
	{
		avatar: { type: Buffer, require: false },
		email: { type: String, require: true },
		username: { type: String, require: true },
		password: { type: String, require: true },
		firstName: { type: String, require: true },
		lastName: { type: String, require: true },
		phone: { type: String, require: false },
		sexe: { type: String, default: 'male', require: true },
		defaultSport: { type: String, default: 'soccer', require: false },
		defaultLanguage: { type: String, default: 'fr', require: false },
		defaultTheme: { type: String, default: 'light', require: false },
		locationTracking: { type: Boolean, default: false, require: false },
		hideAge: { type: Boolean, default: false, require: false },
		hideEmail: { type: Boolean, default: false, require: false },
		hidePhone: { type: Boolean, default: false, require: false },
		hideUsername: { type: Boolean, default: false, require: false },
		localeRegion: { type: String, require: true },
		preferredRegion: { type: String, require: false },
		matchPlayed: { type: Number, require: true },
		matchOrganized: { type: Number, require: true },
		reliability: { type: Number, require: true },
		fitnessLevel: { type: String, default: 'average', require: false }
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
				console.log(ret)
				return ret
			},
		},
	},
)

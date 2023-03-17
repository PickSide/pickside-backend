import { Schema } from 'mongoose'

export const AccountSchema = new Schema(
	{
		email: { type: String, require: true },
		username: { type: String, require: true },
		password: { type: String, require: true },
		configs: {
			defaultSport: { type: String, default: 'soccer', require: false },
			darkModeDefault: { type: Boolean, default: false, require: false },
			locationTracking: { type: Boolean, default: false, require: false },
		},
		profile: {
			firstName: { type: String, require: true },
			lastName: { type: String, require: true },
			sexe: { type: String, require: true },
			localeRegion: { type: String, require: true },
			level: { type: Number, require: true },
			reliability: { type: Number, require: true },
			matchPlayed: { type: Number, require: true },
			matchOrganized: { type: Number, require: true },
		},
	},
	{
		timestamps: true,
		versionKey: false,
		id: true,
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id
				delete ret._id
			},
		},
	},
)

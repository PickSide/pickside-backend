import { model, Document, Schema, Types } from 'mongoose'

export interface IUser extends Document {
	firstName: string
	lastName: string
	email: string
	username: string
	password: string
	sexe: 'male' | 'female'
	level: number
	reliability: number
	matchPlayed: number
	matchOrganized: number
	localeRegion: string
	refreshToken: string[]
}

const UserSchema = new Schema(
	{
		firstName: { type: String, require: true },
		lastName: { type: String, require: true },
		email: { type: String, require: true },
		username: { type: String, require: true },
		password: { type: String, require: true },
		sexe: { type: String, require: true },
		level: { type: Number, require: true },
		reliability: { type: Number, require: true },
		matchPlayed: { type: Number, require: true },
		matchOrganized: { type: Number, require: true },
		localeRegion: { type: String, require: true },
		refreshToken: { type: [String], require: true },
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

export default model<IUser>('User', UserSchema)

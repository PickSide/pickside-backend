import { model, Document, Schema } from 'mongoose'

export interface IUser extends Document {
	id: string
	firstName: string
	lastName: string
	email: string
	sexe: 'male' | 'female'
	level: number
	reliability: number
	matchPlayed: number
	matchOrganized: number
	localeRegion: string
}

const UserSchema = new Schema({
	id: { type: String, require: true },
	firstName: { type: String, require: true },
	lastName: { type: String, require: true },
	email: { type: String, require: true },
	sexe: { type: String, require: true },
	level: { type: Number, require: true },
	reliability: { type: Number, require: true },
	matchPlayed: { type: Number, require: true },
	matchOrganized: { type: Number, require: true },
	localeRegion: { type: String, require: true },
})

export default model<IUser>('User', UserSchema)

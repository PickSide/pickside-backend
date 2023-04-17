import { model, Document, Schema, Types } from 'mongoose'
import { AccountSchema } from '../schemas'

export interface IAccount extends Document {
	id: string
	email: string
	username: string
	password: string
	configs: IAccountConfigs
	profile: IAccountProfile
}

export interface IAccountConfigs extends Document {
	defaultSport: string
	defaultLanguage: string
	darkModeDefault: boolean
	locationTracking: boolean
}

export interface IAccountProfile extends Document {
	firstName: string
	lastName: string
	level: number
	localeRegion: string
	matchOrganized: number
	matchPlayed: number
	reliability: number
	sexe: 'male' | 'female'
}

export default model<IAccount>('Account', AccountSchema)

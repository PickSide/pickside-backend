import { model, Document, Schema, Types } from 'mongoose'
import { AccountSchema } from '../schemas'

export interface IAccount extends Document {
	id: string
	email: string
	username: string
	password: string
	refreshTokens: string[]
	profile: IAccountProfile
	configs: IAccountConfigs
}

export interface IAccountConfigs extends Document {
	defaultSport: string
	darkModeDefault: boolean
	locationTracking: boolean
}

export interface IAccountProfile extends Document {
	sexe: 'male' | 'female'
	firstName: string
	lastName: string
	localeRegion: string
	level: number
	reliability: number
	matchPlayed: number
	matchOrganized: number
}

export default model<IAccount>('Account', AccountSchema)

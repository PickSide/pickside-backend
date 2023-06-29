import { model, Document, Schema, Types } from 'mongoose'
import { AccountSchema } from '../schemas'

export interface IAccount extends Document {
	id: string
	avatar: string
	email: string
	username: string
	password: string
	firstName: string
	lastName: string
	phone: string
	sexe: 'male' | 'female'
	localeRegion: string
	preferredRegion: string
	matchOrganized: number
	matchPlayed: number
	fitnessLevel: 'retired' | 'average' | 'athletic' | 'very athletic'
	reliability: number
	defaultSport: string
	defaultLanguage: 'fr' | 'en'
	deefaultTheme: 'light' | 'dark'
	locationTracking: boolean
	hideAge: boolean
	hideEmail: boolean
	hidePhone: boolean
	hideUsername: boolean
}

// export interface IAccountConfigs extends Document {
// 	localeRegion: string
// 	preferredRegion: string
// 	matchOrganized: number
// 	matchPlayed: number
// 	fitnessLevel: 'retired' | 'average' | 'athletic' | 'very athletic'
// 	reliability: number
// 	defaultSport: string
// 	defaultLanguage: 'fr' | 'en'
// 	deefaultTheme: 'light' | 'dark'
// 	locationTracking: boolean
// 	hideAge: boolean
// 	hideEmail: boolean
// 	hidePhone: boolean
// 	hideUsername: boolean
// }

export default model<IAccount>('User', AccountSchema)

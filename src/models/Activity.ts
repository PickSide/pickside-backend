import { model, Document } from 'mongoose'
import { ActivitySchema } from '../schemas'

export interface IActivity extends Document {
	title: string
	mode: string
	date: any
	location: any
	time: any
	playTime: any
	players: number
	level: string
	price: number
	rules: string
	sport: string
	participants: any[]
	organiser: string
}

export default model<IActivity>('Activity', ActivitySchema)

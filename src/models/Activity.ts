import { model, Document } from 'mongoose'
import { ActivitySchema } from '../schemas'

export interface IActivity extends Document {
	title: string
	description: string
	sport: string
	organiser: string
	participants: any[]
	location: any
	settings: any
	time: Date
}

export default model<IActivity>('Activity', ActivitySchema)

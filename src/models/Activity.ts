import { model, Document } from 'mongoose'
import { ActivitySchema } from '../schemas'

export interface IActivity extends Document {
	title: string
	sport: string
	organiser: string
	participants: any[]
	price: number
	levelRequired: number
	numberOfRegisteredPlayers: number
	maxPlayersCapacity: number
	location: object
}

export default model<IActivity>('Activity', ActivitySchema)

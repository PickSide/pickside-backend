import { Document, Schema, model } from 'mongoose'
import { Sport, SportMode } from './Sport'

import { User } from './User'
import { schemaProps } from '../utils'

export type Activity = Document & {
	id?: string
	address: google.maps.places.PlaceResult
	date: Date
	description?: string
	isPrivate?: boolean
	maxPlayers: number
	mode: SportMode
	organizer: User
	participants: User[]
	price?: number
	rules?: string
	sport: Sport
	time: Date
	title: string
}

const ActivitySchema = new Schema(
	{
		address: { type: Object, require: false },
		date: { type: Schema.Types.Date, require: false },
		description: { type: String, require: false },
		duration: { type: Number, require: false },
		images: { type: [Object], require: false },
		maxPlayers: { type: Number, require: true },
		mode: { type: Object, require: true },
		organizer: { type: Schema.Types.ObjectId, ref: 'User', require: false },
		participants: [{ type: Schema.Types.ObjectId, ref: 'User', require: false, default: [] }],
		recommandedLevel: { type: String, require: false },
		rules: { type: String, require: false },
		sport: { type: Schema.Types.ObjectId, ref: 'Sport', require: false },
		time: { type: Date, require: false },
		title: { type: String, require: false },
		price: { type: Number, require: false },
		isPrivate: { type: Boolean, require: false },
	},
	{
		...schemaProps,
	},
)

export default model<Activity>('Activity', ActivitySchema)

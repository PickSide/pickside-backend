import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export interface IActivity extends Document {
	address: any
	date: any
	description: string
	duration: number
	maxPlayers: number
	mode: string
	organizer: any
	participants: any[]
	recommandedLevel: string
	rules: string
	sport: string
	time: string
	title: string
	price: number
	isPrivate: boolean
}

export const ActivitySchema = new Schema(
	{
		address: { type: Object, require: false },
		date: { type: Schema.Types.Date, require: false },
		description: { type: String, require: false },
		duration: { type: Number, require: false },
		images: { type: [Object], require: false },
		maxPlayers: { type: Number, require: true },
		mode: { type: Object, require: true },
		organizer: { type: Schema.Types.ObjectId, ref: 'User', require: false },
		participants: [{ type: Schema.Types.ObjectId, ref: 'User', require: false }],
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

export default model<IActivity>('Activity', ActivitySchema)

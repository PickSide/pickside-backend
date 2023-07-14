import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export interface IActivity extends Document {
	address: string
	date: {
		stringFormat: string,
		unixFormat: number
	},
	description: string,
	duration: number,
	mode: string,
	organiser: any,
	participants: any[],
	recommandedLevel: string,
	rules: string,
	sport: string,
	time: string,
	title: string,
	unitPrice: number,
}

export const ActivitySchema = new Schema(
	{
		address: { type: Schema.Types.ObjectId, ref: 'Court', require: false },
		date: {
			stringFormat: { type: String, require: false },
			unixFormat: { type: Number, require: false },
		},
		description: { type: String, require: false },
		duration: { type: Number, require: false },
		mode: { type: String, require: false },
		organiser: { type: Schema.Types.ObjectId, ref: 'User', require: false },
		participants: [{ type: Schema.Types.ObjectId, ref: 'User', require: false }],
		recommandedLevel: { type: String, require: false },
		rules: { type: String, require: false },
		sport: { type: Schema.Types.ObjectId, ref: 'Sport', require: false },
		time: { type: Date, require: false },
		title: { type: String, require: false },
		unitPrice: { type: Number, require: false },
	},
	{
		...schemaProps
	},
)


export default model<IActivity>('Activity', ActivitySchema)

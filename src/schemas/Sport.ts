import { Document, Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export type Sport = Document & {
	id?: string
	featureAvailable: boolean
	modes?: SportMode[]
	name: string
	value: string
}

export type SportMode = {
	defaultMaxPlayers: number
	name: string
	value: string
}

const SportSchema = new Schema(
	{
		featureAvailable: { type: Boolean, require: true },
		name: { type: String, require: true },
		value: { type: String, require: true },
		modes: [{
			defaultMaxPlayers: { type: Number, require: true },
			description: { type: String, require: false },
			name: { type: String, require: true },
			value: { type: String, require: true },
		}]

	},
	{
		...schemaProps
	},
)

export default model<Sport>('Sport', SportSchema)
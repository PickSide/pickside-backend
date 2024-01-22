import { Document, Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export type Locale = Document & {
	id?: string
	value: string
	description: string
	flagCode: string
}

const LocaleSchema = new Schema(
	{
		value: { type: String, require: true },
		description: { type: String, require: true },
		flagCode: { type: String, require: true },
	},
	{
		...schemaProps
	},
)
export default model<Locale>('Locale', LocaleSchema)

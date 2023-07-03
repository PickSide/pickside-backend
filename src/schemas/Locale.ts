import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export const LocaleSchema = new Schema(
	{
		value: { type: String, require: true },
		description: { type: String, require: true },
		flagCode: { type: String, require: true },
	},
	{
		...schemaProps
	},
)

export interface ILocale extends Document {
	value: string
	description: string
	flagCode: string
}

export default model<ILocale>('Locale', LocaleSchema)

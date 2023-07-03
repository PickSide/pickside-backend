import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export const TokenSchema = new Schema(
	{
		value: { type: String, require: true },
	},
	{
		...schemaProps,
	},
)

export default model('Token', TokenSchema)
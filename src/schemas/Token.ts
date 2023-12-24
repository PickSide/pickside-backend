import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export const TokenSchema = new Schema(
	{
		lastUsedBy: { type: Schema.Types.ObjectId, ref: 'user', require: true },
		value: { type: String, require: true },
	},
	{
		...schemaProps,
	},
)

export default model('Token', TokenSchema)

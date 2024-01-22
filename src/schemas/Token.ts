import { Document, Schema, model } from 'mongoose'

import { User } from './User'
import { schemaProps } from '../utils'

export type Token = Document & {
	id?: string
	lastUsedBy?: User
	value: string
}

const TokenSchema = new Schema(
	{
		lastUsedBy: { type: Schema.Types.ObjectId, ref: 'user', require: true },
		value: { type: String, require: true },
	},
	{
		...schemaProps,
	},
)

export default model<Token>('Token', TokenSchema)

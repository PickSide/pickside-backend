import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export const EmailSchema = new Schema(
	{
		userIdAssociated: { type: String, require: true },
		value: { type: String, require: true },
		verified: { type: Boolean, default: false, require: true },
	},
	{
		...schemaProps
	},
)


export default model('Email', EmailSchema)
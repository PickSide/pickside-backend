import { Document, Schema, model } from 'mongoose'

import { Sport } from './Sport'
import { User } from './User'
import { schemaProps } from '../utils'

export type Group = Document & {
	id?: string
	coverPhoto?: string
	description?: string
	members: User[]
	name: string
	organizer: User
	requireApproval?: boolean
	sport: Sport
	visibility?: VISIBILITY
}

export enum VISIBILITY {
	PUBLIC = 'public',
	PRIVATE = 'private'
}

const GroupSchema = new Schema(
	{
		coverPhoto: { type: Object, require: false },
		description: { type: String, require: false },
		members: { type: [Schema.Types.ObjectId], ref: 'User', require: true },
		name: { type: String, require: false },
		organizer: { type: Schema.Types.ObjectId, ref: 'User', require: true },
		requireApproval: { type: String, require: false },
		sport: { type: Schema.Types.ObjectId, ref: 'Sport', require: false },
		visibility: { type: ['public', 'private'], default: 'public', require: false },
	},
	{
		...schemaProps,
	},
)

export default model<Group>('Group', GroupSchema)

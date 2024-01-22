import { Document, Schema, model } from 'mongoose'

import { Message } from './Message'
import { User } from './User'
import { schemaProps } from '../utils'

export type Chatroom = Document & {
	id?: string
	name?: string
	participants: User[]
	numberOfMessages?: number
	lastMessage?: Message
}

const ChatroomSchema = new Schema(
	{
		name: { type: String, require: false },
		participants: { type: [Schema.Types.ObjectId], ref: 'User', require: true },
		lastMessage: { type: Schema.Types.ObjectId, ref: 'Message', default: null, require: false },
		numberOfMessages: { type: Number, default: 0, require: false },
	},
	{
		...schemaProps,
	},
)

export default model<Chatroom>('Chatroom', ChatroomSchema)

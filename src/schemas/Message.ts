import { Document, Schema, model } from 'mongoose'

import { Chatroom } from './Chatroom'
import { User } from './User'
import { schemaProps } from '../utils'

export type Message = Document & {
	id: string
	message: string
	chatroomId: Chatroom
	sender: User
	delivered: boolean
}

const MessageSchema = new Schema(
	{
		message: { type: String, require: true },
		chatroomId: { type: Schema.Types.ObjectId, ref: 'Chatroom', require: true },
		sender: { type: Schema.Types.ObjectId, ref: 'User', require: true },
		delivered: { type: Boolean, default: false },
		reactions: { type: String, require: false },
	},
	{
		...schemaProps,
	},
)

export default model<Message>('Message', MessageSchema)

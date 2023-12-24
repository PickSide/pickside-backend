import { Schema, model } from 'mongoose'

import { IChatroom } from './Chatroom'
import { IUser } from './User'
import { schemaProps } from '../utils'

export const MessageSchema = new Schema(
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

export interface IMessage extends Document {
	message: string
	chatroomId: IChatroom
	sender: IUser
	delivered: boolean
}

export default model<IMessage>('Message', MessageSchema)

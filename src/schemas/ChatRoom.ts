import { Schema, model } from 'mongoose'

import { IMessage } from './Message'
import { IUser } from './User'
import { schemaProps } from '../utils'

export const ChatroomSchema = new Schema(
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

export interface IChatroom extends Document {
	id: string
	name: string
	participants: IUser[]
	numberOfMessages: number
	lastMessage: IMessage
}

export default model<IChatroom>('Chatroom', ChatroomSchema)

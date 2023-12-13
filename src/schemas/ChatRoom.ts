import { Schema, model } from 'mongoose'

import { IMessage } from './Message'
import { IUser } from './User'
import { schemaProps } from '../utils'

export const ChatroomSchema = new Schema(
	{
		name: { type: String, require: false },
		participants: { type: [Schema.Types.ObjectId], ref: 'User', require: true },
		openedChatroom: { type: [Schema.Types.ObjectId], ref: 'User', require: true },
		startedBy: { type: Schema.Types.ObjectId, ref: 'User', require: true },
		lastMessage: { type: Schema.Types.ObjectId, ref: 'Message', require: false },
		numberOfMessages: { type: Number, require: false, default: 0 },
	},
	{
		...schemaProps,
	},
)

export interface IChatroom extends Document {
	id: string
	name: string
	participants: IUser[]
	openedChatroom: IUser[]
	numberOfMessages: number
	lastMessage: IMessage
	startedBy: IUser
}

export default model<IChatroom>('Chatroom', ChatroomSchema)

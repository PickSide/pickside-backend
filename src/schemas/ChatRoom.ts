import { Schema, model } from 'mongoose'

import { IMessage } from './Message'
import { IUser } from './User'
import { schemaProps } from '../utils'

export const ChatRoomSchema = new Schema(
	{
		title: { type: String, require: false },
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

export interface IChatRoom extends Document {
	title: string
	participants: IUser[]
	openedChatroom: IUser[]
	numberOfMessages: number
	lastMessage: IMessage
	startedBy: IUser
}

export default model<IChatRoom>('ChatRoom', ChatRoomSchema)

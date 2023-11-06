import { Schema, model } from 'mongoose'

import { IChatRoom } from './ChatRoom'
import { IUser } from './User'
import { schemaProps } from '../utils'

type Reaction = 'like' | 'love'

export const MessageSchema = new Schema(
	{
		message: { type: String, require: true },
		chatRoomId: { type: Schema.Types.ObjectId, ref: 'ChatRoom', require: true },
		sentBy: { type: Schema.Types.ObjectId, ref: 'User', require: true },
		delivered: { type: Boolean, require: true, default: false },
		reactions: { type: String, require: false },
		//seenBy: { type: [Schema.Types.ObjectId], require: false },
	},
	{
		...schemaProps,
	},
)

export interface IMessage extends Document {
	message: String
	chatRoomId: IChatRoom
	sentBy: IUser
	delivered: boolean
	reactions: Reaction[]
	//seenBy: IUser[]
}

export default model<IMessage>('Message', MessageSchema)

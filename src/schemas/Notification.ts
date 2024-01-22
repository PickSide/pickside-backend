import { Document, Schema, model } from 'mongoose'

import { User } from './User'
import { schemaProps } from '../utils'

export enum NOTIFICATIONS {
	SYSTEM = 'system',
	GLOBAL = 'global',
	LIKE = 'like',
	GROUP_INVITE = 'group-invite',
	MESSAGE_REMINDER = 'message-reminder',
	FRIEND_INVITE = 'friend-invite'
}

export type Notification = Document & {
	id?: string
	expires: Date
	isRead: boolean
	message: string
	receiver: User
	sender: User
	type: NOTIFICATIONS
	extra?: any
}

const NotificationSchema = new Schema(
	{
		created: { type: String, require: true },
		expires: { type: Date, require: true },
		isRead: { type: Boolean, default: false },
		message: { type: String, require: true },
		receiver: { type: Schema.Types.ObjectId, ref: 'User', require: true },
		sender: { type: Schema.Types.ObjectId, ref: 'User', require: true },
		type: { type: String, require: true },
	},
	{
		...schemaProps,
	},
)

export default model<Notification>('Notification', NotificationSchema)

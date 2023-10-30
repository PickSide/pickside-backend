import { Schema, model } from 'mongoose'

import { IUser } from './User'
import dayjs from 'dayjs'
import { schemaProps } from '../utils'

export type NotificationType = 'system' | 'global' | 'like' | 'group-invite' | 'message-reminder' | 'friend-invite'

export const NotificationSchema = new Schema(
	{
		created: { type: String, require: true },
		expires: { type: Date, require: true },
		isRead: { type: Boolean, require: false },
		message: { type: String, require: true },
		receiver: { type: Schema.Types.ObjectId, ref: 'User', require: false },
		sender: { type: Schema.Types.ObjectId, ref: 'User', require: false },
		type: { type: String, require: true },
	},
	{
		...schemaProps,
	},
)

export interface INotification extends Document {
	created: dayjs.Dayjs
	expires: dayjs.Dayjs
	isRead: boolean
	message: string
	receiver: IUser
	sender: IUser
	type: NotificationType
}

export default model<INotification>('Notification', NotificationSchema)

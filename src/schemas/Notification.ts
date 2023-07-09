import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export type NotificationType = 'system' | 'global' | 'user'

export const NotificationSchema = new Schema(
    {
        created: { type: String, require: false },
        isRead: { type: Boolean, require: false },
        message: { type: String, require: true },
        receiver: { type: Schema.Types.ObjectId, ref: 'User', require: false },
        sender: { type: Schema.Types.ObjectId, ref: 'User', require: false },
        type: { type: String, require: true },
    },
    {
        ...schemaProps
    },
)


export interface INotification extends Document {
    created: string
    isRead: string
    message: string
    receiver: string
    sender: string
    type: NotificationType
}

export default model<INotification>('Notification', NotificationSchema)
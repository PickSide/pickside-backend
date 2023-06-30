import { Schema, model } from 'mongoose'

export const NotificationSchema = new Schema(
    {
        created: { type: Object, require: false },
        isRead: { type: Object, require: false },
        receiver: { type: Schema.Types.ObjectId, ref: 'User', require: false },
        sender: { type: Schema.Types.ObjectId, ref: 'User', require: false },
        type: { type: ['global', 'message', 'post'], require: true },
    },
    {
        timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            },
        },
    },
)

export interface INotification extends Document {
    created: string[]
    isRead: string
    receiver: string
    sender: string
    type: 'global' | 'message' | 'post'
}

export default model<INotification>('Notification', NotificationSchema)
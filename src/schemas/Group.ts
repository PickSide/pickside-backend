import { Schema, model } from 'mongoose'

export const GroupSchema = new Schema(
    {
        coverPhoto: { type: Object, require: false },
        description: { type: String, require: false },
        members: { type: [Schema.Types.ObjectId], ref: 'User', require: true },
        name: { type: String, require: false },
        organizer: { type: Schema.Types.ObjectId, ref: 'User', require: true },
        requireApproval: { type: String, require: false },
        sport: { type: String, require: false },
        visibility: { type: ['public', 'private'], default: 'public', require: false },
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

export interface IGroup extends Document {
    coverPhoto: string
    description: string
    members: string[]
    name: string
    organizer: any
    requireApproval: any
    sport: string
    visibility: 'public' | 'private'
}

export default model<IGroup>('Group', GroupSchema)
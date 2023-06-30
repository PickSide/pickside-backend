import { Schema, model } from 'mongoose'

export const ScheduleSchema = new Schema(
    {
        from: { type: String, require: false },
        to: { type: String, require: false },
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

export interface ISchedule extends Document {
    from: string
    to: string
}

export default model<ISchedule>('Schedule', ScheduleSchema)
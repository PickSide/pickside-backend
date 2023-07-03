import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export const ScheduleSchema = new Schema(
    {
        from: { type: String, require: false },
        to: { type: String, require: false },
    },
    {
        ...schemaProps
    },
)

export interface ISchedule extends Document {
    from: string
    to: string
}

export default model<ISchedule>('Schedule', ScheduleSchema)
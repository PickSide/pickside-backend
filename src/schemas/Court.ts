import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export const CourtSchema = new Schema(
    {
        available: { type: Boolean, require: false },
        coords: { type: Object, require: true },
        districtCode: { type: String, require: true },
        fieldName: { type: String, require: true },
        isMultisportsZone: { type: Boolean, require: false },
        schedule: { type: Object, require: true },
        type: { type: String, require: true },
    },
    {
        ...schemaProps
    },
)

export interface ICourt extends Document {
    id: string
    available: boolean
    coords: any
    districtCode: string
    fieldName: string
    isMultisportZone: boolean
    schedule: any
    type: string
}

export default model<ICourt>('Court', CourtSchema)
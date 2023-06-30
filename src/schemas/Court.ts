import { Schema, model } from 'mongoose'

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
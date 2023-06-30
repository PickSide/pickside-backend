import { Schema, model } from 'mongoose'

export const CustomCourtSchema = new Schema(
    {

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

export interface ICustomCourt extends Document {
    city: string
    coords: any
    country: string
    district: string[]
    districtCode: string
    state: string
}

export default model<ICustomCourt>('CustomCourt', CustomCourtSchema)
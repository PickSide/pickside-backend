import { Schema } from 'mongoose'

export const PlayableSchema = new Schema(
    {
        fieldName: { type: String, require: true },
        coords: { type: Object, require: true },
        type: { type: String, require: true },
        districtCode: { type: String, require: true },
        schedule: { type: Object, require: true },
        available: { type: Boolean, require: false },
        isMultisportsZone: { type: Boolean, require: false },
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

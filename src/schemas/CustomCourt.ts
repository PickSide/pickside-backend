import { Schema, model } from 'mongoose'

import { schemaProps } from '../utils'

export const CustomCourtSchema = new Schema(
    {

    },
    {
        ...schemaProps
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
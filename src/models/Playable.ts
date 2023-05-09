import { model, Document } from 'mongoose'
import { PlayableSchema } from '../schemas'

export interface IPlayable extends Document {
    id: string
    districtCode: string
    type: string
    coords: any
    fieldName: string
    schedule: any
    available: boolean
    isMultisportZone: boolean
}

export default model<IPlayable>('Playable', PlayableSchema)

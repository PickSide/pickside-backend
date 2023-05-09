import { model, Document, Schema, Types } from 'mongoose'
import { SportSchema } from '../schemas'

export interface ISport extends Document {
	value: string
	description: string
	featureAvailable: boolean
}

export default model<ISport>('Sport', SportSchema)

import { model, Document, Schema, Types } from 'mongoose'
import { SportSchema } from '../schemas'

export interface ISport extends Document {
	value: string
	description: string
}

export default model<ISport>('Sport', SportSchema)

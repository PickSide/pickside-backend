import { model, Document, Schema } from 'mongoose'

export interface ISport extends Document {
	id: string
	value: string
	description: string
}

const SportSchema = new Schema({
	id: { type: String, require: true },
	value: { type: String, require: true },
	description: { type: String, require: true },
})

export default model<ISport>('Sport', SportSchema)

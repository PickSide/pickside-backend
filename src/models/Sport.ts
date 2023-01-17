import { model, Document, Schema, Types } from 'mongoose'

export interface ISport extends Document {
	value: string
	description: string
}

const SportSchema = new Schema(
	{
		value: { type: String, require: true },
		description: { type: String, require: true },
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

export default model<ISport>('Sport', SportSchema)

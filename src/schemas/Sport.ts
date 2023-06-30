import { Schema, model } from 'mongoose'

export const SportSchema = new Schema(
	{
		featureAvailable: { type: Boolean, require: true },
		name: { type: String, require: true },
		value: { type: String, require: true },
		modes: [{
			defaultMaxPlayers: { type: Number, require: true },
			description: { type: String, require: false },
			name: { type: String, require: true },
			value: { type: String, require: true },
		}]

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

export interface ISport extends Document {
	featureAvailable: boolean
	modes: Mode[]
	name: string
	value: string
}

export interface Mode {
	defaultMaxPlayers: number
	description: string
	name: string
	value: string
}

export default model<ISport>('Sport', SportSchema)
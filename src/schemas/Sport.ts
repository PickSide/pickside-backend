import { Schema } from 'mongoose'

export const SportSchema = new Schema(
	{
		value: { type: String, require: true },
		name: { type: String, require: true },
		featureAvailable: { type: Boolean, require: true },
		modes: [{
			value: { type: String, require: true },
			name: { type: String, require: true },
			description: { type: String, require: false },
			defaultMaxPlayers: { type: Number, require: true },
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

import { Schema } from 'mongoose'

export const LocaleSchema = new Schema(
	{
		value: { type: String, require: true },
		description: { type: String, require: true },
		flagCode: { type: String, require: true },
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

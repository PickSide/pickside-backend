import { Schema } from 'mongoose'

export const EmailSchema = new Schema(
	{
		usernameAssociated: { type: String, require: true },
		value: { type: String, require: true },
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

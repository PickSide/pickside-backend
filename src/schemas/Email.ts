import { Schema, model } from 'mongoose'

export const EmailSchema = new Schema(
	{
		userIdAssociated: { type: String, require: true },
		value: { type: String, require: true },
		verified: { type: Boolean, default: false, require: true },
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


export default model('Email', EmailSchema)
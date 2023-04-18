import { Schema } from 'mongoose'

export const AreaSchema = new Schema(
	{
		country: { type: String, require: true },
		state: { type: String, require: false },
		city: { type: String, require: true },
		district: { type: Array<String>, require: true },
		districtCode: { type: String, require: true },
		coords: { type: Object, require: true },
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

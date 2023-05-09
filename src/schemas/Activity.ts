import { Schema, Types } from 'mongoose'

export const ActivitySchema = new Schema(
	{
		title: { type: String, require: true },
		description: { type: String, require: true },
		sport: { type: String, require: true },
		organiser: { type: String, require: true },
		participants: [{ type: String, require: false }],
		location: { type: Types.ObjectId, ref: 'Playable', require: true },
		settings: { type: Object, require: true },
		time: { type: Date, require: true }
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

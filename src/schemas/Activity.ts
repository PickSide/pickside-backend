import { Schema, Types } from 'mongoose'

export const ActivitySchema = new Schema(
	{
		title: { type: String, require: false },
		mode: { type: String, require: false },
		date: { type: String, require: false },
		location: { type: Object, require: false },
		time: { type: Date, require: false },
		playTime: { type: Number, require: false },
		players: { type: Number, require: false },
		level: { type: String, require: false },
		price: { type: Number, require: false },
		rules: { type: String, require: false },
		sport: { type: String, require: false },
		participants: [{ type: String, require: false }],
		organiser: { type: String, require: false },

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

import { Schema } from 'mongoose'

export const SessionSchema = new Schema(
	{
		connectedUserId: { type: String, require: true },
		accountId: { type: String, require: true },
		accessToken: { type: String, require: true },
		sessionType: { type: String, require: false },
		sessionStart: { type: Date, require: true },
		sessionEnd: { type: Date, require: true },
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

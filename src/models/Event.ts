import { model, Document, Schema, Types } from 'mongoose'

export interface ISportEvent extends Document {
	title: string
	type: string
	organiser: string
	participants: any[]
	levelRequired: number
	numberOfRegisteredPlayers: number
	maxPlayersCapacity: number
	location: object
}

const SportEventSchema = new Schema(
	{
		title: { type: String, require: true },
		type: { type: String, require: true },
		organiser: { type: Types.ObjectId, ref: 'User', require: true },
		participants: [{ type: Types.ObjectId, ref: 'User', require: false }],
		levelRequired: { type: Number, require: true },
		numberOfRegisteredPlayers: { type: Number, require: true },
		maxPlayersCapacity: { type: Number, require: true },
		location: { type: Object, require: true },
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

export default model<ISportEvent>('Event', SportEventSchema)

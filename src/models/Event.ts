import { model, Document, Schema, Types } from 'mongoose'

export interface ISportEvent extends Document {
	title: string
	sport: string
	organiser: string
	participants: any[]
	price: number
	levelRequired: number
	numberOfRegisteredPlayers: number
	maxPlayersCapacity: number
	location: object
}

const SportEventSchema = new Schema(
	{
		title: { type: String, require: true },
		sport: { type: String, require: true },
		organiser: { type: Types.ObjectId, ref: 'User', require: true },
		participants: [{ type: Types.ObjectId, ref: 'User', require: false }],
		price: { type: Number, require: true },
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

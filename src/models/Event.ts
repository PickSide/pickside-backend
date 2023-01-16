import { model, Document, Schema, Types } from 'mongoose'

export interface ISportEvent extends Document {
	id: string
	title: string
	type: string
	organiser: string
	levelRequired: number
	numberOfRegisteredPlayers: number
	maxPlayersCapacity: number
	location: string
}

const SportEventSchema = new Schema({
	id: { type: Types.ObjectId, require: true },
	title: { type: String, require: true },
	type: { type: String, require: true },
	organiser: { type: Types.ObjectId, ref: 'User', require: true },
	levelRequired: { type: Number, require: true },
	numberOfRegisteredPlayers: { type: Number, require: true },
	maxPlayersCapacity: { type: Number, require: true },
	location: { type: String, require: true },
})

export default model<ISportEvent>('Event', SportEventSchema)

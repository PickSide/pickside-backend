import { model, Document, Schema, Types } from 'mongoose'

export interface IAvailableCity extends Document {
	id: string
	name: string
	country: string
	state: string
	centerCoordinates: any
}

const AvailableCitySchema = new Schema({
	id: { type: Types.ObjectId, require: true },
	name: { type: String, require: true },
	centerCoordinates: { type: Object, require: true },
	country: { type: String, require: true },
	state: { type: String, require: false },
})

export default model<IAvailableCity>('City', AvailableCitySchema)

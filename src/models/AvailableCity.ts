import { model, Document, Schema, Types } from 'mongoose'

export interface IAvailableCity extends Document {
	name: string
	country: string
	state: string
	centerCoordinates: any
}

const AvailableCitySchema = new Schema(
	{
		name: { type: String, require: true },
		centerCoordinates: { type: Object, require: true },
		country: { type: String, require: true },
		state: { type: String, require: false },
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

export default model<IAvailableCity>('City', AvailableCitySchema)

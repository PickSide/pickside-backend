import { model, Schema } from 'mongoose'
import { schemaProps } from '../utils'

export const PredefinedAreaSchema = new Schema(
	{
		country: { type: String, require: true },
		state: { type: String, require: false },
		city: { type: String, require: true },
		district: { type: Array<String>, require: true },
		districtCode: { type: String, require: true },
		coords: { type: Object, require: true },
	},
	{
		...schemaProps
	},
)

export interface IPredefinedArea extends Document {
	country: string
	state: string
	city: string
	district: string[]
	districtCode: string
	coords: any
}

export default model<IPredefinedArea>('PredefinedArea', PredefinedAreaSchema)
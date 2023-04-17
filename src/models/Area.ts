import { model, Document, Schema, Types } from 'mongoose'
import { AreaSchema } from '../schemas'

export interface IArea extends Document {
	country: string
	state: string
	city: string
	district: string[]
	districtCode: string
	coords: any
}

export default model<IArea>('Area', AreaSchema)

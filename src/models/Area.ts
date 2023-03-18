import { model, Document, Schema, Types } from 'mongoose'
import { AreaSchema } from '../schemas'

export interface IArea extends Document {
	name: string
	country: string
	state: string
	centerCoordinates: any
}

export default model<IArea>('Area', AreaSchema)

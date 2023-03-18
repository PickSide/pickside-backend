import { model, Document, Schema, Types } from 'mongoose'
import { LevelSchema } from '../schemas'

export interface ILevel extends Document {
	name: string
	country: string
	state: string
	centerCoordinates: any
}

export default model<ILevel>('Level', LevelSchema)

import { model, Document, Schema, Types } from 'mongoose'
import { SportSchema } from '../schemas'

export interface ISport extends Document {
	value: string
	name: string
	featureAvailable: boolean
	modes: Mode[]
}

export interface Mode {
	value: string
	name: string
	description: string
	defaultMaxPlayers: number
}

export default model<ISport>('Sport', SportSchema)

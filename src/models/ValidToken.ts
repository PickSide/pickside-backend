import { model, Document, Schema, Types } from 'mongoose'
import { TokenSchema } from '../schemas'

export interface IValidToken extends Document {
	value: string
}

export default model<IValidToken>('ValidToken', TokenSchema)

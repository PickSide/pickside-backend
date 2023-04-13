import { model, Document, Schema, Types } from 'mongoose'
import { TokenSchema } from '../schemas'

export interface IRevokedToken extends Document {
	value: string
}

export default model<IRevokedToken>('RevokedToken', TokenSchema)

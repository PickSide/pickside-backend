import { model, Document, Schema, Types } from 'mongoose'
import { EmailSchema } from '../schemas'

export interface IVerifiedEmail extends Document {
	value: string
	userIdAssociated: string
}

export default model<IVerifiedEmail>('VerifiedEmail', EmailSchema)

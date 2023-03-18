import { model, Document, Schema, Types, Date } from 'mongoose'
import { SessionSchema } from '../schemas'

export interface ISession extends Document {
	connectedUserId: string
	accountId: string
	accessToken: string
	sessionType: any[]
	sessionStart: Date
	sessionEnd: Date
}

export default model<ISession>('Session', SessionSchema)

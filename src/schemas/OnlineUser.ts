import { Schema, model } from 'mongoose'

import { IUser } from './User'
import { schemaProps } from '../utils'

export interface IOnlineUser extends Document {
	user: IUser
}

export const OnlineUserSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', require: false },
	},
	{
		...schemaProps,
	},
)

export default model<IOnlineUser>('OnlineUser', OnlineUserSchema)

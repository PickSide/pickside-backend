import { Document, Model, model } from 'mongoose'
import { User, UserDocument } from './User'

import { Schema } from 'mongoose'
import { schemaProps } from '../utils'

export type OnlineUser = {
	id?: string
	user: User
}

type OnlineUserDocument = OnlineUser & Document

type OnlineUserModel = Model<OnlineUserDocument> & {
	addAsOnlineIfNotPresent(user: User): Promise<void>
	removeIfPresent(user: User): Promise<void>
}

const OnlineUserSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
	},
	{
		...schemaProps,
	},
)

OnlineUserSchema.static('addAsOnlineIfNotPresent', async function (user: User) {
	const isOnline = await this.exists({ user })

	if (isOnline) {
		await this.deleteOne({ user })
	}
	await this.create({ user })
})

OnlineUserSchema.static('removeIfPresent', async function (user: User) {
	const isOnline = await this.exists({ user })

	if (isOnline) {
		await this.deleteOne({ user })
	}
})

export default model<OnlineUserDocument, OnlineUserModel>('OnlineUser', OnlineUserSchema)

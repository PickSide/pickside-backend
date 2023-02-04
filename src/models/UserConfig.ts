import { model, Document, Schema, Types } from 'mongoose'

export interface IUserConfig extends Document {
	allowLocationTracking: boolean
	defaultTheme: string
	defautltLocation: string
	locale: string
	userId: string
}

const UserConfigSchema = new Schema(
	{
		allowLocationTracking: { type: Boolean, require: true },
		defaultTheme: { type: String, ref: 'AppTheme', require: true },
		defautltLocation: { type: Types.ObjectId, ref: 'AvailableCity', require: true },
		isGuest: { type: Boolean, require: false },
		locale: { type: String, ref: 'Locale', require: true },
		userId: { type: Types.ObjectId, ref: 'User', require: false },
	},
	{
		timestamps: true,
		versionKey: false,
		id: true,
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id
				delete ret._id
			},
		},
	},
)

export default model<IUserConfig>('Config', UserConfigSchema)

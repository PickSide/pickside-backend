import { model, Document, Schema, Types } from 'mongoose'

export interface IAppConfig extends Document {
	allowLocationTracking: boolean
	darkModeEnabled: boolean
	defaultDarkMode: boolean
	defautltLocation: string
	locale: string
	userId: string
	//connctedUserLocation: Coordinates
}

const AppConfigSchema = new Schema(
	{
		allowLocationTracking: { type: Boolean, require: true },
		darkModeEnabled: { type: Boolean, require: true },
		defaultDarkMode: { type: Boolean, require: true },
		defautltLocation: { type: Types.ObjectId, ref: 'City', require: true },
		locale: { type: Types.ObjectId, ref: 'Locale', require: true },
		userId: { type: Types.ObjectId, ref: 'User', require: true },
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

export default model<IAppConfig>('Config', AppConfigSchema)

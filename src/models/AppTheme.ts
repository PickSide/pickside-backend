import { model, Document, Schema } from 'mongoose'

export interface IAppTheme extends Document {
	value: string
	description: string
}

const AppThemeSchema = new Schema(
	{
		value: { type: String, require: true },
		description: { type: Object, require: true },
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

export default model<IAppTheme>('Theme', AppThemeSchema)

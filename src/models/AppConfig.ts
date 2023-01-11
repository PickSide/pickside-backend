import { model, Document, Schema } from 'mongoose'

export interface IAppConfig extends Document {
	darkModeEnabled: boolean
	locale: string
	//connctedUserLocation: Coordinates
}

const AppConfigSchema = new Schema({
	darkModeEnabled: { type: Boolean, require: true },
	locale: { type: String, require: true },
	//description: { type: String, require: true },
})

export default model<IAppConfig>('Config', AppConfigSchema)

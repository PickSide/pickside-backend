import { model, Document, Schema } from 'mongoose'

export interface ILocale extends Document {
	id: string
	value: string
	description: string
	flagCode: string
}

const LocaleSchema = new Schema({
	id: { type: String, require: true },
	value: { type: String, require: true },
	description: { type: String, require: true },
	flagCode: { type: String, require: true },
})

export default model<ILocale>('Locale', LocaleSchema)

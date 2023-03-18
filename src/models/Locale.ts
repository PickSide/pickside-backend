import { model, Document, Schema, Types } from 'mongoose'
import { LocaleSchema } from '../schemas'

export interface ILocale extends Document {
	value: string
	description: string
	flagCode: string
}

export default model<ILocale>('Locale', LocaleSchema)

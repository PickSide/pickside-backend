import mongoose from "mongoose"

function getDatabaseURI() {
	const dbAdminUsername = process.env.DB_ADMIN_USERNAME,
		dbAdminPassword = process.env.DB_ADMIN_PASSWORD,
		dbName = process.env.DB_NAME,
		dbHost = process.env.DB_HOST,
		//dbPort = process.env.DB_PORT,
		dbPrefix = process.env.DB_PREFIX
	return `${dbPrefix}://${dbAdminUsername}:${dbAdminPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
}

function getDatabaseOptions() {
	return {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
}

export const reshapingOptions = {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		ret.id = ret._id
		delete ret._id
		return ret;
	},
}

export const schemaProps: mongoose.SchemaOptions = {
	timestamps: true,
	versionKey: false,
	toJSON: reshapingOptions,
	toObject: reshapingOptions,
}

export default {
	getDatabaseURI,
	getDatabaseOptions,
	schemaProps
}

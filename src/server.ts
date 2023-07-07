import Routes from './routes'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import cors from 'cors'
import databaseUtils from './utils/databaseUtils'
import express from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: "Pickside API",
		version: "1.0.0",
		description: "The Pickside API"
	},
	host: `localhost:8000`,
	basePath: '/',
	servers: [
		{
			url: 'localhost:8000/api/v1',
			description: 'Development server',
		},
	],
};

const options = {
	swaggerDefinition,
	apis: ['src/docs/**/*.yaml'],
}

const specs = swaggerJsDoc(options)

config()

connect(databaseUtils.getDatabaseURI()).then(() => console.log('Connected to db!'))

app
	.use(cors(corsOptions()))
	.use(express.json())
	.use(Routes)
	.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
	.listen(process.env.API_SERVER_PORT, () =>
		console.log('Connected to server on port', process.env.API_SERVER_PORT),
	)

function corsOptions() {
	return {
		methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
		origin: 'http://localhost:3000',
		optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
	}
}

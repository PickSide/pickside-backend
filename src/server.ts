import cors from 'cors'
import databaseUtils from './utils/databaseUtils'
import express from 'express'
import Routes from './routes'
import { config } from 'dotenv'
import { connect } from 'mongoose'

const api = express()
const auth = express()

config()

connect(databaseUtils.getDatabaseURI()).then(() => console.log('Connected to db!'))

api
	.use(cors())
	.use(express.json())
	.use(Routes.apiRoutes)
	.listen(process.env.API_SERVER_PORT, () =>
		console.log('Connected to Api server on port', process.env.API_SERVER_PORT),
	)

auth
	.use(cors())
	.use(express.json())
	.use(Routes.authRoutes)
	.listen(process.env.AUTH_SERVER_PORT, () =>
		console.log('Connected to Auth server on port', process.env.AUTH_SERVER_PORT),
	)

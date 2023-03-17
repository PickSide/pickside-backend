import cors from 'cors'
import databaseUtils from './utils/databaseUtils'
import express from 'express'
import Routes from './routes'
import { config } from 'dotenv'
import { connect } from 'mongoose'

const app = express()

config()

connect(databaseUtils.getDatabaseURI()).then(() => console.log('Connected to db!'))

app.use(cors())
app.use(express.json())
app.use(Routes.apiRoutes)
app.use(Routes.authRoutes)

app.listen(process.env.AUTH_SERVER_PORT, () =>
	console.log('Connected to Auth server on port', process.env.AUTH_SERVER_PORT),
)

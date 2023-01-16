import cors from 'cors'
import express from 'express'
import databaseUtils from './utils/databaseUtils'
import Routes from './routes'
import { config } from 'dotenv'
import { connect } from 'mongoose'

const app = express()

config()

connect(databaseUtils.getDatabaseURI()).then(() => console.log('Connected to db!'))

app.use(cors())
app.use(express.json())
app.use(Routes.authRoutes)

app.listen(process.env.AUTH_SERVER_PORT)

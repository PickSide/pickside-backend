import express from 'express'
import routes from './routes'
import cors from 'cors'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import databaseUtils from './utils/databaseUtils'

const app = express()

config()

connect(databaseUtils.getDatabaseURI()).then(() => console.log('Connected to db!'))

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(process.env.LISTEN_PORT)

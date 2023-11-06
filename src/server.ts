import Routes from './routes'
import { Server } from 'socket.io'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import cors from 'cors'
import corsOptions from './corsOptions'
import { createServer } from 'http'
import databaseUtils from './utils/databaseUtils'
import express from 'express'
import groupHandler from './socketHandlers/groupHandler'
import messageHandler from './socketHandlers/messageHandler'
import swaggerDefinition from './swaggerDefinition'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
	cors: corsOptions,
})
const swaggerSpecs = swaggerJsDoc({
	swaggerDefinition,
	apis: ['src/docs/**/*.yaml'],
})

const { createGroup } = groupHandler(io)
const { receiveMessage, sendMessage } = messageHandler(io)

const onConnection = (socket) => {
	console.log(socket.id)
	console.log('socket is connected')
	socket.on('group:create', createGroup(socket))
	socket.on('message:send', createGroup(socket))
}

app
	.use(cors(corsOptions))
	.use(express.json())
	.use('/api/v1', Routes)
	.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

server.listen(process.env.API_SERVER_PORT, () =>
	console.log('Connected to server on port', process.env.API_SERVER_PORT),
)

connect(databaseUtils.getDatabaseURI()).then(() => console.log('Connected to db!'))

io.on('connection', onConnection)

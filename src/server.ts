import Routes from '@routes'
import { Server } from 'socket.io'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import cors from 'cors'
import corsOptions from './corsOptions'
import { createServer } from 'http'
import databaseUtils from './utils/databaseUtils'
import express from 'express'
import messageHandler from './socketHandlers/messageHandler'
import notificationHandler from './socketHandlers/notificationHandler'
import swaggerDefinition from './swaggerDefinition'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import userHandler from '@socketHandlers/userHandler'

config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: corsOptions,
})
const swaggerSpecs = swaggerJsDoc({
	swaggerDefinition,
	apis: ['src/docs/**/*.yaml'],
})

const { notify } = notificationHandler(io)
const { receiveMessage, sendMessage } = messageHandler(io)
const { addOnlineUser, removeOnlineUser } = userHandler(io)

const onConnection = (socket) => {
	//console.log(socket)
	console.log('socket is connected')
	socket.on('group:create', notify(socket))
	socket.on('message:send', notify(socket))
	socket.on('user:login', addOnlineUser(socket))
	socket.on('user:logout', removeOnlineUser(socket))
}

app
	.use(cors(corsOptions))
	.use(express.json())
	.use('/api/v1', Routes)
	.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

io.on('connection', onConnection)

httpServer.listen(process.env.API_SERVER_PORT, () =>
	console.log('Connected to server on port', process.env.API_SERVER_PORT),
)

connect(databaseUtils.getDatabaseURI()).then(() => console.log('Connected to db!'))

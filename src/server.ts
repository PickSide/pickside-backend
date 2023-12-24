import { Server, Socket } from 'socket.io'

import Routes from './routes'
import chatroomHandler from './socketHandlers/handlers/chatroomHandler'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import corsOptions from './corsOptions'
import { createServer } from 'http'
import databaseUtils from './utils/databaseUtils'
import express from 'express'
import mongoose from 'mongoose'
import notificationHandler from './socketHandlers/handlers/notificationHandler'
import swaggerDefinition from './swaggerDefinition'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import userHandler from './socketHandlers/handlers/userHandler'

config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
	allowRequest: (req, callback) => {
		callback(null, true)
	},
	cors: corsOptions,
})
const swaggerSpecs = swaggerJsDoc({
	swaggerDefinition,
	apis: ['src/docs/**/*.yaml'],
})

const { notify } = notificationHandler(io)
const { handleIncomingMessage } = chatroomHandler(io)
const { addOnlineUser, removeOnlineUser } = userHandler(io)

const onChatroomConnection = (socket: Socket) => {
	console.log('chatroom socket connected', socket.id)
	socket.on('chatroom:sending-message', handleIncomingMessage(socket))
	socket.use(([event, ...args], next) => {
		console.log(event)
		if (event === 'chatroom:open') {
			socket.join(`room-${args[0].id}`)
		}
		next()
	})
}

const onGroupConnection = (socket: Socket) => {
	console.log('group socket open')
	socket.on('group:create', notify(socket))
}

const onUserConnection = (socket: Socket) => {
	console.log('users socket open')
	socket.on('user:login', addOnlineUser(socket))
	socket.on('user:logout', removeOnlineUser(socket))
}

io.of('/chatrooms').on('connection', onChatroomConnection)
io.of('/groups').on('connection', onGroupConnection)
io.of('/users').on('connection', onUserConnection)

app
	.use(cors(corsOptions))
	.use(cookieParser())
	.use(express.json())
	.use('/api/v1', Routes)
	.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

httpServer.listen(process.env.API_SERVER_PORT, () =>
	console.log('Connected to server on port', process.env.API_SERVER_PORT),
)

mongoose.set('strictQuery', false)
mongoose.connect(databaseUtils.getDatabaseURI()).then(() => console.log('Connected to db!'))

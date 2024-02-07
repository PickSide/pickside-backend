import { Server, Socket } from 'socket.io'

import OnlineUser from './schemas/OnlineUser'
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
import mysql from 'mysql2'
import notificationHandler from './socketHandlers/handlers/notificationHandler'
import swaggerDefinition from './swaggerDefinition'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

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

const { handleIncomingMessage } = chatroomHandler(io)

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
}

const onUserConnection = (socket: Socket) => {
	console.log('users socket open')
}

io.of('/chatrooms').on('connection', onChatroomConnection)
// io.of('/groups').on('connection', onGroupConnection)
io.of('/users').on('connection', onUserConnection)

app
	.use(cors(corsOptions))
	.use(cookieParser())
	.use(express.json({ limit: '200mb' }))
	.use(express.urlencoded({ extended: true, limit: "200mb" }))
	.use('/api/v1', Routes)
	.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

httpServer.listen(process.env.API_SERVER_PORT, () =>
	console.log('Pickside API service active', process.env.API_SERVER_PORT),
)


// mongoose.set('strictQuery', false)
// mongoose.connect(databaseUtils.getDatabaseURI())
// mongoose.connection.once('open', async () => {
// 	console.log('Connected to db!')
// 	const sockets = await io.of('/users').fetchSockets()
// 	const groupStreamConnection = mongoose.connection.collection('groups').watch()
// 	const onlineUsersStreamConnection = mongoose.connection.collection('onlineusers').watch()

// 	groupStreamConnection.on('change', (change) => {
// 		if (change.operationType === 'insert') {
// 			const members = [...change.fullDocument.members.filter(m => m === change.fullDocument.organizer)]
// 			if (members.length > 0) {
// 				members.forEach((member) => {
// 					// const sockets = io.of('/users').sockets.forEach(x => x.)
// 					// console.log(sockets)
// 				})
// 			}
// 		}
// 	})

// 	onlineUsersStreamConnection.on('change', (change) => {
// 		if (change.operationType === 'insert') {
// 			console.log('insert', change.fullDocument._id)
// 		}
// 		if (change.operationType === 'delete') {
// 			console.log('delete', change.documentKey._id)
// 		}
// 	})
// })
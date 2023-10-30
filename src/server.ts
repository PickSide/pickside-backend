import { Server, Socket } from 'socket.io'

import { IGroup } from './schemas'
import Notification from './schemas/Notification'
import Routes from './routes'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import cors from 'cors'
import { createServer } from 'http'
import databaseUtils from './utils/databaseUtils'
import dayjs from 'dayjs'
import express from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()
const server = createServer(app)
const io = new Server(server, {
	cors: {
		...corsOptions(),
	},
})

const socketList = new Set<Socket>()

io.on('connection', (socket: Socket) => {
	socketList.add(socket)
	socket.on('createdGroup', (group) => {
		group.members.forEach(async (memberId) => {
			const nowDate = dayjs()
			const expireDate = nowDate.add(3, 'day')
			const organizerId = group.organizerId
			const organizerUserame = group.organizerUserame
			const organizerName = group.organizerName
			const notification = await Notification.create({
				created: nowDate,
				expires: expireDate,
				type: 'group-invite',
				sender: organizerId,
				receiver: memberId,
				message: `${organizerUserame} is inviting you to join his group.`,
			})
			socket.broadcast.emit('notifyGroupInvite', notification)
		})
	})
	socket.on('disconnect', () => {
		console.log('notification channel disconnected')
	})
})

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Pickside API',
		version: '1.0.0',
		description: 'The Pickside API',
	},
	host: `localhost:8000/api/v1`,
	basePath: '/',
	servers: [
		{
			url: 'localhost:8000/api/v1',
			description: 'Development server',
		},
	],
}

const options = {
	swaggerDefinition,
	apis: ['src/docs/**/*.yaml'],
}

const specs = swaggerJsDoc(options)

config()

app
	.use(cors(corsOptions()))
	.use(express.json())
	.use('/api/v1', Routes)
	.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs))

connect(databaseUtils.getDatabaseURI()).then(() => console.log('Connected to db!'))
server.listen(process.env.API_SERVER_PORT, () =>
	console.log('Connected to server on port', process.env.API_SERVER_PORT),
)
function corsOptions() {
	return {
		methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	}
}

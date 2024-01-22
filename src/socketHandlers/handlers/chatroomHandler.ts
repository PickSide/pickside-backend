import { Server, Socket } from 'socket.io'

import { Message } from '@schemas/Message'
import { MessageModel } from '@schemas'

export default (io: Server) => {
	const handleIncomingMessage = (socket: Socket) => async (payload: Partial<Message>) => {
		await MessageModel.create(payload)
			.then(() => {
				socket.rooms.forEach((room) => {
					if (room === `room-${payload.chatroomId}`) {
						io.of('/chatrooms').to(room).emit('chatroom:message-registered', payload)
					}
				})
			})
			.catch(() => {
				throw new Error('Error sending message')
			})
	}
	return { handleIncomingMessage }
}

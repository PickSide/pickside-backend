import Message, { IMessage } from '../../schemas/Message'
import { Server, Socket } from 'socket.io'

export default (io: Server) => {
	const handleIncomingMessage = (socket: Socket) => async (payload: Partial<IMessage>) => {
		await Message.create(payload)
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

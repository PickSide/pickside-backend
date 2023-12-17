import { Socket } from 'socket.io'

export default (io) => {
	const sendMessage = (socket: Socket) => (payload) => {
		socket.broadcast.emit('message:sent', payload)
	}
	const receiveMessage = (socket: Socket) => (payload) => {
		socket.broadcast.emit('message:received', payload)
	}

	return { receiveMessage, sendMessage }
}

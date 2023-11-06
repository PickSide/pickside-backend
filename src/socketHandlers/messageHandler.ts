import { Socket } from 'socket.io'

export default (io) => {
	const sendMessage = (socket: Socket) => (payload) => {
		socket.broadcast.emit('message:send', payload)
	}
	const receiveMessage = (socket: Socket) => (payload) => {
		socket.broadcast.emit('message:receive', payload)
	}

	return { receiveMessage, sendMessage }
}

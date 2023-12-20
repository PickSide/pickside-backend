import { ExtendedError } from 'socket.io/dist/namespace'
import { Socket } from 'socket.io'

const setupRoom = (socket: Socket, next: (err?: ExtendedError | undefined) => void) => {
	console.log('socket request', socket.request)
	next()
}

export default setupRoom

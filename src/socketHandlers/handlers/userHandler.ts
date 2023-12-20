import { IUser } from '../../schemas/User'
import OnlineUser from '../../schemas/OnlineUser'
import { Socket } from 'socket.io'

export default (io) => {
	const addOnlineUser = (socket: Socket) => async (payload: IUser) => {
		const user = await OnlineUser.create({ user: payload.id })
		socket['userId'] = user.id
		console.log(socket['userId'])
		socket.broadcast.emit('user:isonline', payload)
	}
	const removeOnlineUser = (socket: Socket) => async (payload: IUser) => {
		await OnlineUser.findOneAndDelete({ user: payload.id }).exec()
		delete socket['userId']
		socket.broadcast.emit('user:isoffline', payload)
	}

	return { addOnlineUser, removeOnlineUser }
}

import { NotificationModel } from '@schemas'
import { Socket } from 'socket.io'
import dayjs from 'dayjs'

export default (io) => {
	const notifyUsers = (socket: Socket) => async ({ message, receiver, sender, type, extra }) => {
		const nowDate = dayjs()
		const expireDate = nowDate.add(3, 'day')
		const notification = await NotificationModel.create({
			created: nowDate,
			expires: expireDate,
			type,
			sender,
			receiver,
			message,
			extra,
		})
		socket.broadcast.emit('group:notify', notification)
	}

	return { notifyUsers }
}

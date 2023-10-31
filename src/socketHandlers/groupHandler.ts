import { IGroup } from 'src/schemas'
import Notification from '../schemas/Notification'
import { Socket } from 'socket.io'
import dayjs from 'dayjs'

export default (io) => {
	const createGroup = (socket: Socket) => (payload: IGroup & { organizerId?: string; organizerUserame?: string }) => {
		console.log(payload)
		payload.members.forEach(async (memberId) => {
			const nowDate = dayjs()
			const expireDate = nowDate.add(3, 'day')
			const organizerId = payload.organizerId
			const organizerUserame = payload.organizerUserame
			const notification = await Notification.create({
				created: nowDate,
				expires: expireDate,
				type: 'group-invite',
				sender: organizerId,
				receiver: memberId,
				message: `${organizerUserame} is inviting you to join his group.`,
			})
			socket.broadcast.emit('group:notify', notification)
		})
	}

	return { createGroup }
}

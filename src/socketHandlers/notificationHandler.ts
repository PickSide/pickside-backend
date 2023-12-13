import { IGroup } from '../schemas/Group'
import Notification from '../schemas/Notification'
import { Socket } from 'socket.io'
import dayjs from 'dayjs'

export default (io) => {
	const notify = (socket: Socket) => (payload: IGroup & { organizerId?: string; organizerUsername?: string }) => {
		payload.members.forEach(async (memberId) => {
			const nowDate = dayjs()
			const expireDate = nowDate.add(3, 'day')
			const organizerId = payload.organizerId
			const organizerUsername = payload.organizerUsername
			const notification = await Notification.create({
				created: nowDate,
				expires: expireDate,
				type: 'group-invite',
				sender: organizerId,
				receiver: memberId,
				message: `${organizerUsername} is inviting you to join his group.`,
			})
			socket.broadcast.emit('group:notify', notification)
		})
	}

	return { notify }
}

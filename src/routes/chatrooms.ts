import {
	deleteChatroom,
	getOrInitializeChatroom,
	sendMessageToChatroom,
	updateChatroom,
} from '../controllers/ChatroomController'

import { Router } from 'express'

const router = Router()

router.post('/users', getOrInitializeChatroom)
router.post('/', sendMessageToChatroom)
router.put('/update/:id', updateChatroom)
router.delete('/login', deleteChatroom)

export default router

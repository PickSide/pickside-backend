import {
	deleteChatroom,
	getOrInitializeChatroom,
	sendMessageToChatroom,
	updateChatroom,
} from '../controllers/ChatroomController'

import { Router } from 'express'
import { validateAccessToken } from '../middleware/auth.middleware'

const router = Router()

router.post('/users', validateAccessToken, getOrInitializeChatroom)
router.post('/', sendMessageToChatroom)
router.put('/update/:id', updateChatroom)
router.delete('/login', deleteChatroom)

export default router

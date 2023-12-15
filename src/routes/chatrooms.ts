import {
	deleteChatroom,
	getOrInitializeChatroom,
	sendMessageToChatroom,
	updateChatroom,
} from '@controllers/ChatroomController'

import { Router } from 'express'
import { validateAccessToken } from '@middleware/auth.middleware'

const router = Router()

router.get('/users/:id', validateAccessToken, getOrInitializeChatroom)
router.post('/:id', sendMessageToChatroom)
router.put('/update/:id', updateChatroom)
router.delete('/login', deleteChatroom)

export default router

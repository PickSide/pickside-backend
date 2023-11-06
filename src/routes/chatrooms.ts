import { ChatRoomController } from '../controllers'
import { Router } from 'express'

const router = Router()

router.get('/users/:id', ChatRoomController.getChatroomByInitiatorId)
router.post('/initialize', ChatRoomController.initializeChatroom)
router.put('/update/:id', ChatRoomController.updateChatroom)
router.delete('/login', ChatRoomController.deleteChatroom)

export default router

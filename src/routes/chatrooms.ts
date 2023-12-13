import ChatroomController from '../controllers/ChatroomController'
import { Router } from 'express'

const router = Router()

router.get('/users/:id', ChatroomController.getChatroomByInitiatorId)
router.post('/initialize', ChatroomController.initializeChatroom)
router.post('/users/:id', ChatroomController.getChatroomByInitiatorId)
router.post('/:id', ChatroomController.sendMessageToChatroom)
router.put('/update/:id', ChatroomController.updateChatroom)
router.delete('/login', ChatroomController.deleteChatroom)

export default router

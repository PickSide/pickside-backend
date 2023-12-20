import MessageController from '../controllers/MessageController'
import express from 'express'

const router = express.Router()

router.get('/:chatroomId', MessageController.getAllMessagesByChatroomId)

export default router

import { UserController } from '../controllers'
import express from 'express'
import { validateAccessToken } from '../middleware'

const router = express.Router()

router.get('/', UserController.get)
router.put('/:id/settings', validateAccessToken, UserController.update)

export default router
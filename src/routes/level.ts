import express from 'express'
import { LevelController } from '../controllers'
import { validateAccessToken } from '../middleware'
const router = express.Router()

router.get('/', validateAccessToken, LevelController.get)

export default router
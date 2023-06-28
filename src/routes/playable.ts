import express from 'express'
import { PlayableController } from '../controllers'
const router = express.Router()

router.get('/', PlayableController.get)

export default router
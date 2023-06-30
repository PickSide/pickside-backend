import express from 'express'
import { EmailController } from '../controllers'

const router = express.Router()

router.get('/verify', EmailController.verify)

export default router
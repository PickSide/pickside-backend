import EmailController from '../controllers/EmailController'
import express from 'express'

const router = express.Router()

router.get('/verify', EmailController.verify)

export default router

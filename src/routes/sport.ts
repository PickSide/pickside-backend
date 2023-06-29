import express from 'express'
import { SportController } from '../controllers'
const router = express.Router()

router.get('/', SportController.get)

export default router
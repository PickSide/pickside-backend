import express from 'express'
import { LocaleController } from '../controllers'
const router = express.Router()

router.get('/', LocaleController.get)

export default router
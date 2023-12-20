import LocaleController from '../controllers/LocaleController'
import express from 'express'

const router = express.Router()

router.get('/', LocaleController.get)

export default router

import express from 'express'
import { SettingsTemplateController } from '../controllers'
const router = express.Router()

router.get('/', SettingsTemplateController.get)

export default router
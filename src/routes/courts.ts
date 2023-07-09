import express from 'express'
import { CourtController } from '../controllers'

const router = express.Router()

router.get('/', CourtController.getSystemDefinedCourts)

export default router
import SportController from '../controllers/SportController'
import express from 'express'

const router = express.Router()

router.get('/', SportController.getAllSports)

export default router

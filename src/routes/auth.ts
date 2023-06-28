import { Router } from 'express'
import {
    UserController,
    AuthController,
} from '../controllers'

const router = Router()

router.get('/token', AuthController.getAccessToken)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/account/create', UserController.create)

export default router

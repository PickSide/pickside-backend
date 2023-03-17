import { Router } from 'express'
import {
	AccountController,
	ActivityController,
	AreaController,
	AuthController,
	LevelController,
	LocaleController,
	SessionController,
	SportController,
} from './controllers'

const apiRoutes = Router()
const authRoutes = Router()

// Authentication routes used for authentication only
// authRoutes.post('/login', AuthController.authenticate)
// authRoutes.post('/logout', AuthController.logout)
// authRoutes.get('/token', AuthController.getAccessToken)

// PUT
// apiRoutes.put('/activities/:activityId', ActivityController.update)

// POST
// apiRoutes.post('/activities', ActivityController.create)
// apiRoutes.post('/users/create', AccountController.create)
// apiRoutes.post('/session/create', SessionController.create)

// GET
apiRoutes.get('/user', AccountController.get)
// apiRoutes.get('/activities', ActivityController.get)
// apiRoutes.get('/locales', LocaleController.get)
// apiRoutes.get('/sports', SportController.get)

export default { apiRoutes, authRoutes }

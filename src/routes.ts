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
import { validateAccessToken } from './middleware'

const apiRoutes = Router()
const authRoutes = Router()

// Authentication routes used for authentication only
authRoutes.get('/token', AuthController.getAccessToken)
authRoutes.post('/login', AuthController.login)
authRoutes.post('/logout', AuthController.logout)

// PUT
apiRoutes.put('/activities/:activityId', ActivityController.update)

// POST
apiRoutes.post('/activities', validateAccessToken, ActivityController.create)
apiRoutes.post('/session/create', validateAccessToken, SessionController.create)
apiRoutes.post('/users/create', validateAccessToken, AccountController.create)

// GET
apiRoutes.get('/account', AccountController.get)
apiRoutes.get('/activities', ActivityController.get)
apiRoutes.get('/areas', validateAccessToken, AreaController.get)
apiRoutes.get('/levels', validateAccessToken, LevelController.get)
apiRoutes.get('/locales', LocaleController.get)
apiRoutes.get('/sports', SportController.get)

export default { apiRoutes, authRoutes }

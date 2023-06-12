import { Router } from 'express'
import {
	AccountController,
	ActivityController,
	AreaController,
	AuthController,
	LevelController,
	LocaleController,
	PlayableController,
	SettingsTemplateController,
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
apiRoutes.put('/account/:id/settings', validateAccessToken, AccountController.update)

// POST
apiRoutes.post('/activities', validateAccessToken, ActivityController.create)
apiRoutes.post('/session/create', validateAccessToken, SessionController.create)
apiRoutes.post('/account/create', AccountController.create)

// GET
apiRoutes.get('/account', AccountController.get)
apiRoutes.get('/activities', ActivityController.get)
apiRoutes.get('/areas', AreaController.getAll)
apiRoutes.get('/areas/states', AreaController.getByState)
apiRoutes.get('/areas/cities', AreaController.getByCity)
apiRoutes.get('/areas/district/:code', AreaController.getByDistrictCode)
apiRoutes.get('/levels', validateAccessToken, LevelController.get)
apiRoutes.get('/locales', LocaleController.get)
apiRoutes.get('/playables', PlayableController.get)
apiRoutes.get('/sports', SportController.get)
apiRoutes.get('/settings', SettingsTemplateController.get)

export default { apiRoutes, authRoutes }

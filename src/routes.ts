import { Router } from 'express'
import AppConfigController from './controllers/AppConfigController'
import AppThemeController from './controllers/AppThemeController'
import AuthController from './controllers/AuthController'
import EventController from './controllers/EventController'
import LocaleController from './controllers/LocaleController'
import LogoutController from './controllers/LogoutController'
import RefreshTokenController from './controllers/RefreshTokenController'
import SportController from './controllers/SportController'
import UserController from './controllers/UserController'

const apiRoutes = Router()

// Authentication routes used for authentication only
apiRoutes.post('/auth', AuthController.handleLogin)
apiRoutes.get('/logout', LogoutController.handleLogout)
apiRoutes.get('/refresh', RefreshTokenController.handleRefreshToken)

// Authentication routes used for authentication only
apiRoutes.put('/configs', AppConfigController.update)

apiRoutes.put('/events/:eventId', EventController.update)

apiRoutes.post('/events', EventController.store)
apiRoutes.post('/users/create', UserController.store)

// Api routes used for API rest calls
apiRoutes.get('/configs/', AppConfigController.index)
apiRoutes.get('/configs/:userId', AppConfigController.index)
apiRoutes.get('/events', EventController.index)
apiRoutes.get('/locales', LocaleController.index)
apiRoutes.get('/sports', SportController.index)
apiRoutes.get('/themes', AppThemeController.index)
apiRoutes.get('/user', UserController.index)

export default { apiRoutes }

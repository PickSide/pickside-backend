import { Router } from 'express'
import AppConfigController from './controllers/AppConfig'
import AuthController from './controllers/AuthController'
import EventController from './controllers/EventController'
import LocaleController from './controllers/LocaleController'
import LogoutController from './controllers/LogoutController'
import RefreshTokenController from './controllers/RefreshTokenController'
import SportController from './controllers/SportController'
import UserController from './controllers/UserController'
import { authenticateToken } from './utils/authenticateToken'

const authRoutes = Router()
const apiRoutes = Router()

// Authentication routes used for authentication only
authRoutes.post('/auth', AuthController.handleLogin)
authRoutes.get('/logout', LogoutController.handleLogout)
authRoutes.get('/refresh', RefreshTokenController.handleRefreshToken)

// Authentication routes used for authentication only
authRoutes.put('/configs', AppConfigController.update)

// Api routes used for API rest calls
apiRoutes.get('/configs/:userId', AppConfigController.index)
apiRoutes.get('/events', EventController.index)
apiRoutes.get('/locales', LocaleController.index)
apiRoutes.get('/sports', SportController.index)
apiRoutes.get('/user', UserController.index)

export default { apiRoutes, authRoutes }

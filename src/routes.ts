import { Router } from 'express'
import AppConfigController from './controllers/AppConfig'
import AuthController from './controllers/AuthController'
import LocaleController from './controllers/LocaleController'
import LogoutController from './controllers/LogoutController'
import RefreshTokenController from './controllers/RefreshTokenController'
import UserController from './controllers/User'
import { authenticateToken } from './utils/authenticateToken'

const authRoutes = Router()
const apiRoutes = Router()

// Authentication routes used for authentication only
authRoutes.post('/auth', AuthController.handleLogin)
authRoutes.get('/logout', LogoutController.handleLogout)
authRoutes.get('/refresh', RefreshTokenController.handleRefreshToken)

// Api routes used for API rest calls
apiRoutes.get('/config/:userId', AppConfigController.index)
apiRoutes.get('/user', UserController.index)
apiRoutes.get('/locales', LocaleController.index)

export default { apiRoutes, authRoutes }

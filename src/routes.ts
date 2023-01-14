import { Router } from 'express'
import AppConfigController from './controllers/AppConfig'
import AuthController from './controllers/AuthController'
import LocaleController from './controllers/LocaleController'
import LogoutController from './controllers/LogoutController'
import RefreshTokenController from './controllers/RefreshTokenController'
import UserController from './controllers/User'

const routes = Router()

routes.post('/auth', AuthController.handleLogin)

routes.get('/logout', LogoutController.handleLogout)
routes.get('/refresh', RefreshTokenController.handleRefreshToken)

routes.get('/config/:userId', AppConfigController.index)
routes.get('/user', UserController.index)

routes.get('/locales', LocaleController.index)

export default routes

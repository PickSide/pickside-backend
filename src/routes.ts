import { Router } from 'express'
import AppConfigController from './controllers/AppConfig'
import UserController from './controllers/User'

const routes = Router()

routes.get('/config/:userId', AppConfigController.index)
routes.get('/user', UserController.index)

export default routes

import { Router } from 'express'
import activities from './activity'
import auth from './auth'
import courts from './courts'
import customCourts from './custom-courts'
import emails from './emails'
import groups from './groups'
import locales from './locale'
import notifications from './notifications'
import predefinedAreas from './predefined-area'
import resetDb from './resetdb'
import schedules from './schedules'
import sports from './sport'
import users from './user'

const rootRouter = Router()

rootRouter.use('/', auth)
rootRouter.use('/', resetDb)
rootRouter.use('/activities', activities)
rootRouter.use('/courts', courts)
rootRouter.use('/custom-courts', customCourts)
rootRouter.use('/emails', emails)
rootRouter.use('/groups', groups)
rootRouter.use('/locales', locales)
rootRouter.use('/notifications', notifications)
rootRouter.use('/predefined-areas', predefinedAreas)
rootRouter.use('/schedules', schedules)
rootRouter.use('/sports', sports)
rootRouter.use('/users', users)

export default rootRouter

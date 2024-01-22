import { Router } from 'express'
import activities from './activity'
import chatrooms from './chatrooms'
import groups from './groups'
import locales from './locale'
import messages from './messages'
import notifications from './notifications'
import resetDb from './resetdb'
import session from './session'
import sports from './sport'
import users from './user'

const rootRouter = Router()

rootRouter.use('/', session)
rootRouter.use('/', resetDb)
rootRouter.use('/activities', activities)
rootRouter.use('/chatrooms', chatrooms)
rootRouter.use('/groups', groups)
rootRouter.use('/locales', locales)
rootRouter.use('/messages', messages)
rootRouter.use('/notifications', notifications)
rootRouter.use('/sports', sports)
rootRouter.use('/users', users)

export default rootRouter

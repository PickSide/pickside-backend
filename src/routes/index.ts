import { Router } from 'express'
import users from './user'
import activities from './activity'
import areas from './area'
import auth from './auth'
import levels from './level'
import locales from './locale'
import playables from './playable'
import settings from './settings'
import sports from './sport'

const rootRouter = Router()

rootRouter.use('/', auth)
rootRouter.use('/users', users)
rootRouter.use('/activities', activities)
rootRouter.use('/areas', areas)
rootRouter.use('/levels', levels)
rootRouter.use('/locales', locales)
rootRouter.use('/playables', playables)
rootRouter.use('/settings', settings)
rootRouter.use('/sports', sports)

export default rootRouter
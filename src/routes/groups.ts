import GroupController from '../controllers/GroupController'
import express from 'express'
import { validateAccessToken } from '../middleware/session.middleware'

const router = express.Router()

router.get('/', GroupController.getAllGroups)
router.get('/user/:userId', GroupController.getAllGroupsForUserId)
router.post('/', validateAccessToken, GroupController.createGroup)
router.get('/:groupId', GroupController.getByGroupdId)
router.post('/join', validateAccessToken, GroupController.joinGroup)
router.post('/leave', validateAccessToken, GroupController.leaveGroup)
router.put('/:groupId', validateAccessToken, GroupController.updateGroupById)
router.delete('/:groupId', validateAccessToken, GroupController.deleteGroupById)

export default router

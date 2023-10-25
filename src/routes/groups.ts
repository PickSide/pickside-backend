import { GroupController } from '../controllers'
import express from 'express'

const router = express.Router()

router.get('/', GroupController.getAllGroups)
router.get('/user/:userId', GroupController.getAllGroupsForUserId)
router.post('/', GroupController.createGroup)
router.get('/:groupId', GroupController.getByGroupdId)
router.put('/:groupId', GroupController.updateGroupById)
router.delete('/:groupId', GroupController.deleteGroupById)

export default router

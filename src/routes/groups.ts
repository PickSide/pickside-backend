import express from 'express'
import { GroupController } from '../controllers'

const router = express.Router()

router.get('/', GroupController.getAllGroups)
router.post('/', GroupController.createGroup)
router.get('/:groupId', GroupController.getByGroupdId)
router.put('/:groupId', GroupController.updateGroupById)
router.delete('/:groupId', GroupController.deleteGroupById)

export default router
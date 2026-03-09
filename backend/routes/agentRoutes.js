import express from 'express'
import * as agentController from '../controllers/agentController.js'

const router = express.Router()

router.post('/', agentController.createAgent)
router.get('/', agentController.getAgents)
router.get('/stats', agentController.getAgentStats)
router.get('/:id', agentController.getAgentById)
router.patch('/:id', agentController.updateAgent)

export default router

import express from 'express'
import * as leadController from '../controllers/leadController.js'

const router = express.Router()

router.post('/', leadController.createLead)
router.get('/', leadController.getLeads)
router.get('/stats', leadController.getLeadStats)
router.get('/:id', leadController.getLeadById)
router.patch('/:id/status', leadController.updateLeadStatus)
router.patch('/:id/assign', leadController.assignLead)

export default router

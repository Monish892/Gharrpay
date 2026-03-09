import express from 'express'
import * as visitController from '../controllers/visitController.js'

const router = express.Router()

router.post('/', visitController.scheduleVisit)
router.get('/', visitController.getVisits)
router.get('/stats', visitController.getVisitStats)
router.get('/:id', visitController.getVisitById)
router.patch('/:id', visitController.updateVisit)

export default router

import express from 'express'
const router = express.Router()

// import controllers

import { cancelDelivery, completeDelivery, listDelivery, registerDelivery, startDelivery } from '../controllers/DeliveryController'

router.post('/', registerDelivery)
router.get('/', listDelivery)
router.patch('/:id/start', startDelivery)
router.patch('/:id/complete', completeDelivery)
router.patch('/:id/cancel', cancelDelivery)

export default router
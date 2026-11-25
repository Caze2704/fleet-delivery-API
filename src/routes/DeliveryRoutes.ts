import express from 'express'
const router = express.Router()

// import controllers

import { listDelivery, registerDelivery, startDelivery } from '../controllers/DeliveryController'

router.post('/', registerDelivery)
router.get('/', listDelivery)
router.patch('/:id/start', startDelivery)

export default router
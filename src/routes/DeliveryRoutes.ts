import express from 'express'
const router = express.Router()

// import controllers

import { listDelivery, registerDelivery } from '../controllers/DeliveryController'

router.post('/', registerDelivery)
router.get('/', listDelivery)

export default router
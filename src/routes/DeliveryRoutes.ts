import express from 'express'
const router = express.Router()

// import controllers

import { registerDelivery } from '../controllers/DeliveryController'

router.post('/', registerDelivery)

export default router
import express from 'express/'
const router = express.Router()

// import controllers

import { createVehicle, listVehicle } from '../controllers/VehicleController'

router.post('/', createVehicle)
router.get('/', listVehicle)
router.put('/:id')

export default router
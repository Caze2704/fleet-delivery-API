import express from 'express/'
const router = express.Router()

// import controllers

import { createVehicle, listVehicle, updateVehicleLocation } from '../controllers/VehicleController'

router.post('/', createVehicle)
router.get('/', listVehicle)
router.patch('/coordenate/:id', updateVehicleLocation)

export default router
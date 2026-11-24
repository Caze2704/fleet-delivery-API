import express from 'express/'
const router = express.Router()

// import controllers

import { createVehicle } from '../controllers/VehicleController'

router.post('/', createVehicle)

export default router
const express = require('express')
const app = express()

// import routes

import VehicleRoutes from './routes/VehicleRoutes'

app.use(express.json())

// config routes

app.use('/vehicles', VehicleRoutes)

export default app
const express = require('express')
const app = express()

// import routes

import VehicleRoutes from './routes/VehicleRoutes'
import DeliveryRoutes from './routes/DeliveryRoutes'

app.use(express.json())

// config routes

app.use('/vehicles', VehicleRoutes)
app.use('/deliveries', DeliveryRoutes)

export default app
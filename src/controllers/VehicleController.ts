import { VehicleService } from "../services/VehicleService";
import { Request, Response } from "express";

async function createVehicle(req: Request, res: Response) {
    try {
        const { license_plate, model, capacityKG, coordenate } = req.body || {}

        const post = await VehicleService.createVehicle({ license_plate, model, capacityKG, coordenate })

        res.status(201).json({
            message: "Veículo registrado com sucesso!",
            post
        })
    } catch (error: any) {
        console.log(error)
        const status = error.statusCode || 500
        const message = error.statusCode ? error.message : "Não foi possível completar a solucitação..."

        res.status(status).json({ message })
    }
}

export { createVehicle }

import { VehicleService } from "../services/VehicleService";
import { Request, Response } from "express";
import { StatusVehicle } from "../types/Vehicle";

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
        const message = error.statusCode ? error.message : "Não foi possível completar a solicitação..."

        res.status(status).json({ message })
    }
}

async function listVehicle(req: Request, res: Response){
    try {
        const { status } = req.query;

        const vehicles = await VehicleService.listVehicle(status as StatusVehicle | undefined)

        if(vehicles.length === 0){
            return res.status(200).json({
                message: "Sem veículos cadastrados no momento...",
                vehicles
            })
        }

        return res.status(200).json({
            vehicles
        })
        
    } catch (error: any) {
        console.log(error)
        const status = error.statusCode || 500
        const message = error.statusCode ? error.message : "Não foi possível completar a solicitação..."

        res.status(status).json({ message })
    }
}

async function updateVehicleLocation(req: Request, res: Response){
    try {

        const { id } = req.params
        
        const { newCoordenate } = req.body || {}

        const newVehicleLocation = await VehicleService.updateVehicleLocation(String(id), { newCoordenate })

        res.status(200).json({
            message: `Localização de veículo atualizada com sucesso! Nova localização: ${newVehicleLocation.get('coordenate')}`,
            newVehicleLocation
        })

    } catch (error: any) {
        console.log(error)
        const status = error.statusCode || 500
        const message = error.statusCode ? error.message : "Não foi possível completar a solicitação..."

        res.status(status).json({ message })
    }
}

export { createVehicle, listVehicle, updateVehicleLocation }

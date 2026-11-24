import { Vehicle } from "../models";
import { CreateVehicleDTO, StatusVehicle } from "../types/Vehicle";

// helpers

import { throwError } from "../helpers/throwError";
import { isCoordenate } from "../helpers/isCoordenate";

class VehicleService {

    static async createVehicle(data: CreateVehicleDTO){

        if(!data.capacityKG || !data.license_plate || !data.model || !data.coordenate){
            throwError('Preencha todos os campos obrigatórios!', 422)
        }

        if(!Number.isSafeInteger(data.capacityKG) || data.capacityKG <= 0 || typeof data.license_plate !== 'string' || typeof data.model !== 'string'){
            throwError('Dados inseridos são inválidos!', 422)
        }

        const plateExists = await Vehicle.findOne({ where: {license_plate: data.license_plate}})

        if(plateExists){
            throwError('Placa já cadastrada!', 409)
        }

        const coordenate = isCoordenate(data.coordenate)

        const newVehicle = await Vehicle.create(data)
        return newVehicle
    }

    static async listVehicle(status?: StatusVehicle){

        if(status !== undefined){
            if(typeof status !== 'string' || !['disponivel', 'em_rota', 'manutencao'].includes(status)){
                throwError('Status inválidos!', 422)
            }
        }

        const where = status ? { status } : {}

        const vehicles = await Vehicle.findAll({where, order: [['createdAt', 'DESC']]})

        if(vehicles.length === 0){
            return vehicles
        }

        return vehicles
    
    }
}

export { VehicleService }


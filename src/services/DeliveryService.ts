import sequelize from "../config/db";
import { isCoordenate } from "../helpers/isCoordenate";
import { isUUID } from "../helpers/isUUID";
import { throwError } from "../helpers/throwError";
import { Delivery, Vehicle } from "../models";
import { CreateDeliveryDTO, StartDeliveryDTO, StatusDelivery } from "../types/Delivery";

class DeliveryService {

    static async createDelivery(data: CreateDeliveryDTO){

        if(!data.description || !data.destination || !data.weightKG){
            throwError('Preencha todos os campos obrigatórios!', 422)
        }

        if(typeof data.description !== 'string' || typeof data.weightKG !== 'number' || data.weightKG <= 0){
            throwError('Parâmetros inválidos!', 422)
        }

        isCoordenate(data.destination)

        const info = {
            trackingCode: 'TRK-' + crypto.randomUUID().slice(0, 8).toUpperCase(),
            description: data.description,
            destination: data.destination,
            weightKG: data.weightKG,
        }

        const delivery = await Delivery.create(info)

        return delivery
    }

    static async listDeliveries(status?: StatusDelivery){

        if(status !== undefined){
            if(typeof status !== 'string' || !['aguardando_coleta', 'em_transito', 'entregue', 'cancelada'].includes(status)){
                throwError("Status inválido!", 422)
            }
        }

        const where = status ? { status } : {}

        const deliveries = await Delivery.findAll({where, order: [['createdAt', 'DESC']]}) // incluir depois o include: [{model: Vehicle}]

        return deliveries
    }


    static async startDelivery(id: string, data: StartDeliveryDTO){

        if(!data.vehicleId || typeof data.vehicleId !== 'string'){
            throwError("Informe o veículo corretamente!", 422)
        }

        isUUID(id)
        isUUID(data.vehicleId)

        const result = await sequelize.transaction(async (t) => {

            const delivery = await Delivery.findOne({where: {id}, transaction: t})

            if(!delivery){
                throwError('Entrega não encontrada!', 404)
            }

            const vehicle = await Vehicle.findOne({where: {id: data.vehicleId}, transaction: t})

            if(!vehicle){
                throwError('Veículo não encontrado!', 404)
            }

            await delivery.update({ status: "em_transito", vehicleId: data.vehicleId}, { transaction: t })

            await vehicle.update({ status: "em_rota" }, { transaction: t})
            return delivery
        })

        return result

    }
}

export { DeliveryService }
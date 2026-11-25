import { isCoordenate } from "../helpers/isCoordenate";
import { throwError } from "../helpers/throwError";
import { Delivery } from "../models";
import { CreateDeliveryDTO, StatusDelivery } from "../types/Delivery";

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

}

export { DeliveryService }
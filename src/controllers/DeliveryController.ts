import { Request, Response } from "express";
import { DeliveryService } from "../services/DeliveryService";
import { StatusDelivery } from "../types/Delivery";

async function registerDelivery(req: Request, res: Response){
    try {
        
        const { description, weightKG, destination } = req.body || {}

        const delivery = await DeliveryService.createDelivery({description, weightKG, destination})

        return res.status(201).json({
            message: "Entrega registrada com sucesso!",
            dados: delivery
        })

    } catch (error: any) {
        console.log(error)
        const status = error.statusCode || 500
        const message = error.statusCode ? error.message : "Não foi possível completar a solicitação..."

        res.status(status).json({ message })
    }
}

async function listDelivery(req: Request, res: Response){

    try {
        
        const { status } = req.query

        const deliveries = await DeliveryService.listDeliveries(status as StatusDelivery | undefined)

        if(deliveries.length === 0){
            return res.status(200).json({message: "Nenhuma entrega registrada!", deliveries})
        }

        return res.status(200).json({deliveries})

    } catch (error: any) {
        console.log(error)
        const status = error.statusCode || 500
        const message = error.statusCode ? error.message : "Não foi possível completar a solicitação..."

        res.status(status).json({ message })
    }

}

export { registerDelivery, listDelivery }
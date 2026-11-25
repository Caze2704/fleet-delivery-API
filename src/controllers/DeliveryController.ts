import { Request, Response } from "express";
import { DeliveryService } from "../services/DeliveryService";

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

export { registerDelivery }
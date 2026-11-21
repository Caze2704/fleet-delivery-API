import { Coordenate } from "./Coordenate";

export type StatusDelivery = 'aguardando_coleta' | 'em_transito' | 'entregue' | 'cancelada'

export interface Delivery {
    id: string;
    trackingCode: string;
    description: string;
    weightKG: number;
    destination: Coordenate;
    status: StatusDelivery;
    vehicleId: string | null;
    createdAt: Date;
}

export type CreateDeliveryDTO = Omit<Delivery, 'id' | 'trackingCode' | 'status' | 'vehicleId' | 'createdAt'>

export interface StartDeliveryDTO {
    vehicleId: string;
}
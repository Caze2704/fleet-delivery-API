import { Coordenate } from "./Coordenate"

export type StatusVehicle = 'disponivel' | 'em_rota' | 'manutencao'

export interface Vehicle {
    id: string;
    license_plate: string;
    model: string;
    capacityKG: number;
    status: StatusVehicle;
    coordenate: Coordenate;
}

export type CreateVehicleDTO = Omit<Vehicle, 'id' | 'status'>;

export interface UpdateCoordenateDTO {
    newCoordenate: Coordenate;
}
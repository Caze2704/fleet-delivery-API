import { Coordenate } from "../types/Coordenate";
import { throwError } from "./throwError";

export function isCoordenate(data: unknown): data is Coordenate{
    if(!Array.isArray(data) || data.length !== 2){
        throwError('Coordenada inválida!', 422)
    }

    if(typeof data[0] !== 'number' || typeof data[1] !== 'number'){
        throwError('Coordenada inválida!', 422)
    }

    if(Number.isNaN(data[0] || Number.isNaN(data[1]))){
        throwError('Coordenada inválida!', 422)
    }

    return true
}
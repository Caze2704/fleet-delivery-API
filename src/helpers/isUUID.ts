import { throwError } from "./throwError"

export function isUUID(id: unknown): id is string{
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    
    if(typeof id !== 'string' || !uuidRegex.test(id)) throwError('Id inválido!', 422)

    return true
}
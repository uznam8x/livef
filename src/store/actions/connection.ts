import {IConnection} from "../interfaces/connection";
export enum TConnection {
    UPDATE = 'connect/update',
}

export interface AConnection {
    type: TConnection.UPDATE,
    payload: IConnection,
}

export function update( payload: IConnection): AConnection{
    return {
        type: TConnection.UPDATE,
        payload,
    }
}

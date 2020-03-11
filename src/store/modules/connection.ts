import { AConnection, TConnection } from "../actions/connection";
import { IConnection } from "../interfaces/connection";
export interface IState  {
    from: IConnection,
    to: IConnection
}

const initialState: IState = {
    from: {
        x: 0,
        y: 0,
    },
    to: {
        x: 0,
        y: 0,
    }
}


export default (state: IState = initialState, action: AConnection) => {
    switch (action.type){
        case TConnection.UPDATE:
            const res = Object.assign({}, state, action.payload)
            return res;
        default:
            return state;
    }
}
import { TBox, ABoxRegister } from "../actions/box";
import { IBoxConnect } from "../interfaces/box";
export interface IState  {
    indexed: {
        [key: string]: IBoxConnect
    };
}

const initialState: IState = {
    indexed: {}
}


export default function boxes(state: IState = initialState, action: ABoxRegister) {
    switch (action.type){
        case TBox.REGISTER:
            const payload = {
                [action.payload.id]:action.payload
            }
            return {
                indexed: Object.assign({}, state.indexed, payload)
            }
        default:
            return state;
    }
}
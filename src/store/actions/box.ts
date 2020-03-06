import {IBoxConnect} from "../interfaces/box";
export enum TBox {
    REGISTER = 'boxes/register',
}

export interface ABoxRegister {
    type: TBox.REGISTER,
    payload: IBoxConnect,
}

export function register( payload: IBoxConnect): ABoxRegister{
    return {
        type: TBox.REGISTER,
        payload,
    }
}

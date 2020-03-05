const REGISTER = "boxes/register";

type TState = {
    indexed: any;
}
const initial: TState = {
    indexed: {}
}
export const register = ( payload: any ) => ( {type:REGISTER, payload})
export default function Boxes(state: TState = initial, action: any){
    
    switch (action.type){
        case REGISTER:
            return {
                indexed: Object.assign(state.indexed, action.payload)
            }
        default:
            return state;
    }
}
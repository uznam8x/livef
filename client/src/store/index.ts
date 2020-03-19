import { combineReducers } from "redux";
import * as Boxes from "./modules/boxes";
import * as Connection from "./modules/connection";

export type RootState = {
    boxes: Boxes.IState;
    connection: Connection.IState;
}
export default combineReducers<RootState>({
    boxes: Boxes.default,
    connection: Connection.default,
});
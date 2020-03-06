import { combineReducers } from "redux";
import * as Boxes from "./modules/boxes";

export type RootState = {
    boxes: Boxes.IState;
}
export default combineReducers<RootState>({
    boxes: Boxes.default
});
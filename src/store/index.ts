import { combineReducers } from "redux";
import boxes from "./modules/boxes";
export type RootState = {
    boxes: any;
}
export default combineReducers({
    boxes
});
import { combineReducers } from "redux";
import FacilitiesReducer from "./facilities-reducer";

const rootReducer = combineReducers({
    facilities: FacilitiesReducer
});

export default rootReducer;

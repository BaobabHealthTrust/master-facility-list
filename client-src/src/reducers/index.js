import { combineReducers } from 'redux';
import FacilitiesReducer from './facilities-reducer';


const rootReducer = combineReducers({
    facilities: FacilitiesReducer,
    facilityDetails: FacilitiesReducer,
    showResource:FacilitiesReducer,
    showLocation:FacilitiesReducer
});

export default rootReducer;

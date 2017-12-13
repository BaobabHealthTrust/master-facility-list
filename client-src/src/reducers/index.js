import { combineReducers } from 'redux';
import FacilitiesReducer from './facilities-reducer';
import DependanciesReducer from './dependencies-reducer';
import DownloadsReducer from './downloads-reducer';
import SearchResults from './search-reducer';

const rootReducer = combineReducers({
    facilities: FacilitiesReducer,
    dependancies: DependanciesReducer,
    downloads: DownloadsReducer,
    searchResults: SearchResults
});

export default rootReducer;

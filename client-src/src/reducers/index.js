import { combineReducers } from 'redux';
import FacilitiesReducer from './facilities-reducer';
import DependanciesReducer from './dependencies-reducer';
import DownloadsReducer from './downloads-reducer';
import SearchResults from './search-reducer';
import GlobalContainers from './global-containers';
import AdvancedSearchReducer from './advanced-search-reducer';

const rootReducer = combineReducers({
    facilities: FacilitiesReducer,
    dependancies: DependanciesReducer,
    downloads: DownloadsReducer,
    searchResults: SearchResults,
    globalContainers: GlobalContainers,
    advancedSearchValues: AdvancedSearchReducer
});

export default rootReducer;

import { combineReducers } from "redux";
import FacilitiesReducer from "./facilities-reducer";
import DependanciesReducer from "./dependencies-reducer";
import DownloadsReducer from "./downloads-reducer";
import SearchResults from "./search-reducer";
import GlobalContainers from "./global-containers";
import AdvancedSearchReducer from "./advanced-search-reducer";
import DashboardStatistics from "./dashboard-reducer";
import AuthReducer from "./auth-reducer";
import FormValues from "./form-values-reducer";
import PostResponse from "./form-post-reducer";
import UsersReducer from "./users-reducer";

const rootReducer = combineReducers({
    facilities: FacilitiesReducer,
    dependancies: DependanciesReducer,
    downloads: DownloadsReducer,
    searchResults: SearchResults,
    globalContainers: GlobalContainers,
    advancedSearchValues: AdvancedSearchReducer,
    dashboardStatistics: DashboardStatistics,
    authReducer: AuthReducer,
    formValues: FormValues,
    postResponse: PostResponse,
    users: UsersReducer
});

export default rootReducer;

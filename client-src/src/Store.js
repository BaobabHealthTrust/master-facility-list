import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import promise from "redux-promise";

const Store = createStore(
  rootReducer,
  compose(
    applyMiddleware(promise)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default Store;

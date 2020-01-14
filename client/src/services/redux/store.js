import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import promiseMiddleware from "redux-promise-middleware";
import { createLogger } from "redux-logger";

const middleware = compose(applyMiddleware(promiseMiddleware));
// const middleware = compose(
//   applyMiddleware(promiseMiddleware, createLogger({ collapsed: true })),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
const Store = createStore(rootReducer, middleware);

export default Store;

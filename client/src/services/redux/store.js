import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import promiseMiddleware from "redux-promise-middleware";
import { createLogger } from "redux-logger";

const middleware = compose(applyMiddleware(promiseMiddleware));

const Store = createStore(rootReducer, middleware);

export default Store;

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import promiseMiddleware from "redux-promise-middleware";
import { createLogger } from "redux-logger";

const Store = createStore(
  rootReducer,
  compose(
    applyMiddleware(promiseMiddleware, createLogger({ collapsed: true }))
  )
);

export default Store;

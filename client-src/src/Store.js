import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import promise from 'redux-promise';

const Store = createStore(rootReducer, applyMiddleware(promise));

export default Store;

import {createStore, applyMiddleware, compose} from 'redux';
import createRootReducer from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(
        routerMiddleware(history),
        logger,
        thunk))
);
export default store;
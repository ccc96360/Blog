import {createStore, compose, applyMiddleware}from'redux'
import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'

import {createRootReducer} from './redux/_reducers/index.js'
import rootSaga from './redux/sagas'

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middlewares = [routerMiddleware(history), sagaMiddleware,  promiseMiddleware, ReduxThunk];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer = process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
)
sagaMiddleware.run(rootSaga)
export default store
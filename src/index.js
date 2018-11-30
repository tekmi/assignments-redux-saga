import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import rootReducer from './store/reducers/index';
const loggerMiddleware = createLogger();
const composeEnhancers = (MODE === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

import {watchAuth, watchUser} from './store/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            sagaMiddleware,
            loggerMiddleware,
        ))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchUser);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

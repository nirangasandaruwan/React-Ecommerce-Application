import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';

import { persistStore} from 'redux-persist';

import rootReducer from './root-reducer';


import createSagaMiddleware from 'redux-saga';
import {fetchCollectionsStart} from './shop/shop.sagas';

import rootSaga from './root.saga';


const sagaMiddleware = createSagaMiddleware();


const middlewares = [logger,sagaMiddleware]; //scalable

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default {store,persistor};

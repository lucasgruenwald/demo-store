import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// type ExtendedPersistConfig = PersistConfig<RootState> & {
//   whitelist: (keyof RootState)[];
// }

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(
  (middleware): middleware is Middleware => Boolean(middleware) );

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) 
  ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
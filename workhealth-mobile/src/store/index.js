import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import {apiMiddleware} from '../services/api';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';

export const configureStore = () => {
  const middlewares = [apiMiddleware];
  if (__DEV__) {
    middlewares.push(logger);
  }
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  return {store, persistor};
};

import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';
import { initialState as authInfo } from './redux/pages/Login/reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  authInfo,
};

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['authInfo'],
};
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);


export default createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);

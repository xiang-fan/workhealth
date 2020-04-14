import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

import auth from './auth';
import questions from './questions';
import history from './history';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  timeout: null,
  blacklist: ['errorCode'],
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  questions,
  history
});

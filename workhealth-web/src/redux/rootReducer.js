import { combineReducers } from 'redux';

import { authReducer as authInfo } from './pages/Login/reducer';

export default combineReducers({
  authInfo,
});

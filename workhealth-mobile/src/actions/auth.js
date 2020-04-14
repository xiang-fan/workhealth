import * as types from '../constants/actionTypes';
import * as endpoints from '../configs';
import { GET_METHOD } from '../configs';

export const login = token => {
  return {
    endpoint: endpoints.login,
    method: GET_METHOD,
    types: [types.LOGIN_REQUEST, types.LOGIN_SUCCESS, types.LOGIN_FAILURE],
    token
  };
};

export const setToken = token => ({
  type: types.SET_TOKEN,
  token
})

export const logout = () => ({
  type: types.LOGOUT
})

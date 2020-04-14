import * as endpoints from '../configs';
import { GET_METHOD } from '../configs';
import * as types from '../constants/actionTypes';

export const getCurrentHistory = () => {
  return {
    endpoint: endpoints.currentHistory,
    method: GET_METHOD,
    types: [
      types.GET_CURRENT_HISTORY_REQUEST,
      types.GET_CURRENT_HISTORY_SUCCESS,
      types.GET_CURRENT_HISTORY_FAILURE
    ]
  };
};

export const getHistoryByPass = (pass) => {
  return {
    endpoint: endpoints.historyByPass(pass),
    method: GET_METHOD,
    types: [
      types.GET_HISTORY_BY_PASS_REQUEST,
      types.GET_HISTORY_BY_PASS_SUCCESS,
      types.GET_HISTORY_BY_PASS_FAILURE
    ]
  };
};

export const getHistoryByUsername = (username) => {
  return {
    endpoint: endpoints.historyByUsername(username),
    method: GET_METHOD,
    types: [
      types.GET_HISTORY_BY_USERNAME_REQUEST,
      types.GET_HISTORY_BY_USERNAME_SUCCESS,
      types.GET_HISTORY_BY_USERNAME_FAILURE
    ]
  };
};

export const clearPass = () => ({
  type: types.CLEAR_PASS
})

export const clearUsername = () => ({
  type: types.CLEAR_USERNAME
})

export const getUserScreeningHistory = (user) => ({
  endpoint: endpoints.historyUserId(user.id),
  method: GET_METHOD,
  types: [
    types.GET_USER_SCREENING_HISTORY_REQUEST,
    types.GET_USER_SCREENING_HISTORY_SUCCESS,
    types.GET_USER_SCREENING_HISTORY_FAILURE,
  ],
  user
})

export const saveSelectUser = (user) => ({
  type: types.SAVE_SELECTED_USER,
  user
})

export const clearUserHistory = () => ({
  type: types.CLEAR_USER_HISTORY
})

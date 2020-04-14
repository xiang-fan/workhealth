import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  CLEAR_AUTH_FAIL,
  LOGOUT,
  USER_DATA,
} from '../../../constants/constants';

export const initialState = {
  isAuth: false,
  error: null,
  userName: null,
  userRole: null,
  personalId: null
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
    return {
        ...state,
        isAuth: true,
        error: null,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_AUTH_FAIL:
      return {
        ...state,
        error: null,
      };
    case USER_DATA:
      return {
        ...state,
        userName: payload.username,
        userRole: payload.userRole,
        personalId: payload.personalId
      };
    case LOGOUT:
      return {
        ...initialState,
        isAuth: false,
        userName: null,
        userRole: null,
        personalId: null

      };
    default:
      return state;
  }
};

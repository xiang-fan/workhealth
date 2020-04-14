import * as types from '../constants/actionTypes';

let initialState = {
  currentHistory: [],
  passHistory: null,
  usersHistory: null,
  fetchingHistoryPass: false,
  fetchingHistoryUsers: false,
  userScreeningHistory: null,
  selectedUser: null
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CURRENT_HISTORY_REQUEST: {
      return {
        ...state
      }
    }
    case types.GET_CURRENT_HISTORY_SUCCESS: {
      return {
        ...state,
        currentHistory: action.result.screeningHistories.reverse()
      }
    }
    case types.GET_CURRENT_HISTORY_FAILURE: {
      return {
        ...state
      }
    }
    case types.GET_HISTORY_BY_PASS_REQUEST: {
      return {
        ...state,
        fetchingHistoryPass: true
      }
    }
    case types.GET_HISTORY_BY_PASS_SUCCESS: {
      let passHistory = {};
      if (action.result.screeningHistory.length === 0) {
        passHistory.valid = false;
      } else {
        let isOldScreening = new Date(action.result.screeningHistory[0].createdAt).getDate() < new Date().getDate()
        passHistory.valid = true;
        passHistory.status = isOldScreening ? 'old' : action.result.screeningHistory[0].status;
        passHistory.username = action.result.screeningHistory[0].User.username
        passHistory.personalId = action.result.screeningHistory[0].User.personalId
        passHistory.date = Date.parse(action.result.screeningHistory[0].createdAt)
      }
      return {
        ...state,
        passHistory,
        fetchingHistoryPass: false
      }
    }
    case types.GET_HISTORY_BY_PASS_FAILURE: {
      return {
        ...state,
        fetchingHistoryPass: false
      }
    }
    case types.GET_HISTORY_BY_USERNAME_REQUEST: {
      return {
        ...state,
        fetchingHistoryUsers: true
      }
    }
    case types.GET_HISTORY_BY_USERNAME_SUCCESS: {
      let usersHistory = {};
      if (action.result.users.length === 0) {
        usersHistory.valid = false;
      } else {
        usersHistory.valid = true;
        usersHistory.users = action.result.users
      }
      return {
        ...state,
        usersHistory,
        fetchingHistoryUsers: false
      }
    }
    case types.GET_HISTORY_BY_USERNAME_FAILURE: {
      return {
        ...state,
        fetchingHistoryUsers: false
      }
    }

    case types.CLEAR_USERNAME: {
      return {
        ...state,
        usersHistory: null
      }
    }

    case types.CLEAR_PASS: {
      return {
        ...state,
        passHistory: null
      }
    }

    case types.GET_USER_SCREENING_HISTORY_REQUEST: {
      return {
        ...state,
      }
    }
    case types.GET_USER_SCREENING_HISTORY_SUCCESS: {
      return {
        ...state,
        userScreeningHistory: action.result.screeningHistory
      }
    }
    case types.GET_USER_SCREENING_HISTORY_FAILURE: {
      return {
        ...state,
        userScreeningHistory: null
      }
    }
    case types.SAVE_SELECTED_USER: {
      return {
        ...state,
        selectedUser: action.user
      }
    }
    case types.CLEAR_USER_HISTORY: {
      return {
        ...state,
        userScreeningHistory: null
      }
    }
    default:
      return state;
  }
};

export default history;

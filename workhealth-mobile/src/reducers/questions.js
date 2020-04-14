import * as types from '../constants/actionTypes';

let initialState = {
  fetchingQuestions: false,
  questions: [],
  errorCode: null,
  questionsResult: null,
  answersByPass: null,
  imageBlob: null
};

const questions = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUESTIONS_REQUEST: {
      return {
        ...state,
        questions: [],
        fetchingQuestions: true,
      };
    }
    case types.GET_QUESTIONS_SUCCESS: {
      return {
        ...state,
        questions: action.result.questionnaires,
        fetchingQuestions: false,
      };
    }
    case types.GET_QUESTIONS_FAILURE: {
      return {
        ...state,
        errorCode: action.errorCode,
        fetchingQuestions: false,
      };
    }
    case types.POST_QUESTIONS_REQUEST: {
      return {
        ...state,
        questionsResult: null,
      };
    }
    case types.POST_QUESTIONS_SUCCESS: {
      const questionsResult = action.result.status === 'failed'
        ? {status: 'failed', id: action.result.id}
        : {status: 'passed', pass: action.result.pass, id: action.result.id};
      return {
        ...state,
        questionsResult,
      };
    }
    case types.POST_QUESTIONS_FAILURE: {
      return {
        ...state,
        questionsResult: null,
        errorCode: action.errorCode,
      };
    }
    case types.CLEAR_QUESTIONS: {
      return {
        ...state,
        fetchingQuestions: false,
        questions: [],
        errorCode: null,
        questionsResult: null,
        answersByPass: null,
        imageBlob: null
      };
    }
    case types.GET_ANSWER_BY_PASS_REQUEST: {
      return {
        ...state,
        answersByPass: null
      }
    }
    case types.GET_ANSWER_BY_PASS_SUCCESS: {
      return {
        ...state,
        answersByPass: action.result
      }
    }
    case types.GET_ANSWER_BY_PASS_FAILURE: {
      return {
        ...state,
        answersByPass: null,
        errorCode: action.errorCode
      }
    }
    case types.GET_IMAGE_REQUEST: {
      return {
        ...state
      }
    }
    case types.GET_IMAGE_SUCCESS: {
      return {
        ...state,
        imageBlob: action.result
      }
    }
    case types.GET_IMAGE_FAILURE: {
      return {
        ...state
      }
    }
    default:
      return state;
  }
};

export default questions;

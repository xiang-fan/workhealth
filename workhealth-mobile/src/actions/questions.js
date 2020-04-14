import * as endpoints from '../configs';
import { GET_METHOD, POST_METHOD } from '../configs';
import * as types from '../constants/actionTypes';
import { BASE_URL } from '../configs';

export const getQuestions = () => {
  return {
    endpoint: endpoints.questionnaire,
    method: GET_METHOD,
    types: [
      types.GET_QUESTIONS_REQUEST,
      types.GET_QUESTIONS_SUCCESS,
      types.GET_QUESTIONS_FAILURE
    ]
  };
};

export const postQuestionsAnswers = (body) => {
  return {
    endpoint: endpoints.questionnaire,
    method: POST_METHOD,
    types: [
      types.POST_QUESTIONS_REQUEST,
      types.POST_QUESTIONS_SUCCESS,
      types.POST_QUESTIONS_FAILURE
    ],
    body
  }
};

export const clearQuestions = () => {
  return {
    type: types.CLEAR_QUESTIONS
  }
}

export const getAnswersByPass = (pass) => {
  return {
    endpoint: endpoints.answerByPass(pass),
    method: GET_METHOD,
    types: [
      types.GET_ANSWER_BY_PASS_REQUEST,
      types.GET_ANSWER_BY_PASS_SUCCESS,
      types.GET_ANSWER_BY_PASS_FAILURE
    ]
  }
}

export const getImage = (endpoint) => {
  return {
    endpoint: endpoint,
    method: GET_METHOD,
    types: [
      types.GET_IMAGE_REQUEST,
      types.GET_IMAGE_SUCCESS,
      types.GET_IMAGE_FAILURE
    ]
  }
}

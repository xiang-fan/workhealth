export const login = `/auth/login`;
export const questionnaire = `/questionnaire`;
export const currentHistory = '/screeningHistory/current';
export const historyByPass = pass => `/screeningHistory?pass=${pass}`;
export const historyUserId = userId => `/screeningHistory?userId=${userId}`;
export const historyByUsername = username => `/user?username=${username}`;
export const answerByPass = (id) => `/screeningHistory/answers/${id}`;

export const GET_METHOD = 'GET';
export const POST_METHOD = 'POST';
export const REQUEST_TIMEOUT = 20000;
export const BASE_URL = 'http://your.base.url';

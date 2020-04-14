import {BASE_URL} from '../configs';
import {REQUEST_TIMEOUT, login as loginEndpoint} from '../configs';
import {setToken} from '../actions/auth';

async function getFetchAction({endpoint, method, token, body}) {
  const request = {
    method,
    headers: {
      Authorization: token,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    request.body = JSON.stringify(body);
  }
  return fetch(`${BASE_URL}${endpoint}`, request);
}

const timeoutAction = reject =>
  setTimeout(() => reject(new Error('request timeout')), REQUEST_TIMEOUT);

export function callApi({endpoint, method, token, body}) {
  return Promise.race([
    getFetchAction({endpoint, method, token, body}),
    new Promise((resolve, reject) => timeoutAction(reject))
  ])
    .then(response => {
      let extensions = endpoint.substring(endpoint.lastIndexOf('.'))
      if (extensions  === '.jpg' || extensions === '.png' || extensions === '.jpeg') {
        return response.blob().then(blob=>{
          return {json: {blob}, response}
        })
      }
      return response.json().then(json => {
        return {json, response};
      });
    })
    .then(({json, response}) => {
      if (!response.ok || !json) {
        json.code = response.status;
        return Promise.reject(json);
      }
      return json;
    });
}

export const apiMiddleware = store => next => action => {
  let { endpoint } = action;
  const { types, method, body } = action;

  if (!endpoint && !method && !types && action.type) {
    return next(action);
  }

  const state = store.getState();

  if (typeof endpoint === 'function') {
    endpoint = endpoint(state);
  }

  if (!method) {
    throw new Error('method is not exist');
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const [requestType, successType, failureType] = types;

  next(Object.assign({}, {type: requestType}));

  let token;
  if (action.endpoint === loginEndpoint) {
    token = action.token;
  } else {
    token = store.getState().auth.token;
  }

  return callApi({endpoint, method, token, body}).then(
    response => {
      if (action.endpoint === loginEndpoint) {
        store.dispatch(setToken(action.token));
      }

      const result = response;
      next(Object.assign({}, { type: successType, result }));
      return result;
    },
    error => {
      __DEV__ && console.log(error);
      next(
        Object.assign(
          {},
          {
            type: failureType,
            status: 'ERROR',
            errorCode: error.code,
            description: error.data
          }
        )
      );
    }
  );
};

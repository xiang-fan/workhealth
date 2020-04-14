import { Base64 } from 'js-base64';

export const createBasicAuthenticationToken = (username, password) => {
  return `Basic ${Base64.encode(`${username}:${password}`)}`;
};

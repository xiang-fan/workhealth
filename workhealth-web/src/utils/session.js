export const TOKEN_KEY = 'authSelfScreenngToken';

export const clearStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};

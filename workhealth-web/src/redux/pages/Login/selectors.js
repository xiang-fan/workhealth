import { createSelector } from 'reselect';

const rootSelector = state => state.authInfo;

export const selectIsAuth = createSelector(
  [rootSelector],
  state => state.isAuth,
);

export const selectAuthError = createSelector(
  [rootSelector],
  state => state.error,
);

export const selectUserRole = createSelector(
  [rootSelector],
  state => state.userRole,
);

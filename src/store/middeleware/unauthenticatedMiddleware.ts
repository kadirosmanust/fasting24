import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

export const unauthenticatedMiddleware: Middleware = () => next => action => {
  if (isRejectedWithValue(action) && action.error?.code == '401') {
    console.log('unauthenticated');
  }

  return next(action);
};

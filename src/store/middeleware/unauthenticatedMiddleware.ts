import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import store from '..';
import { clearCreadentials } from '../reducers/auth';

export const unauthenticatedMiddleware: Middleware = () => next => action => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (isRejectedWithValue(action) && action.payload?.status === 401) {
    store.dispatch(clearCreadentials());
  }

  return next(action);
};

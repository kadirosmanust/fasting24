import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { unauthenticatedMiddleware } from './middeleware/unauthenticatedMiddleware';
import authReducer from './reducers/auth';
import { authApi } from './services/auth';
import { fastingApi } from './services/fasting';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [fastingApi.reducerPath]: fastingApi.reducer,
    auth: authReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      unauthenticatedMiddleware,
      authApi.middleware,
      fastingApi.middleware,
    ]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

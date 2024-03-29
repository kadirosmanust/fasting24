import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/user';
import type { RootState } from '@/store';

import { get, set, remove } from '@/libs/cookieHelper';
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
} from '@/libs/localStorage';

type AuthState = {
  user: User | null;
  token: string | null;
};

const getInitialState = (): AuthState => {
  const token = get('token');
  const user = getItemFromLocalStorage('user');

  if (token && user) {
    return {
      user: JSON.parse(user),
      token,
    };
  }

  return {
    user: null,
    token: null,
  };
};

const initialState: AuthState = getInitialState();

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: User; token: string }>,
    ) => {
      set('token', token, { expires: 3 });
      setItemToLocalStorage('user', JSON.stringify(user));

      state.user = user;
      state.token = token;
    },
    clearCreadentials: state => {
      state.user = null;
      state.token = null;
      remove('token');
      removeItemFromLocalStorage('user');
    },
  },
});

export const { setCredentials, clearCreadentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

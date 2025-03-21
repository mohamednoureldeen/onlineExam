import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { IauthTokenState } from './auth.model';

const initialState: IauthTokenState = {
  token: null,
};

export const authTokenReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token }) => ({ ...state, token })),
  on(logout, (state) => ({ ...state, token: null }))
);
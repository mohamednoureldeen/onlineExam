import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { IauthTokenState } from './auth.model';
import { jwtDecode } from "jwt-decode";
import { AuthTokenService } from '../services/auth.token.service';


const authTokenService = new AuthTokenService ({} as any); 
const tokenFromStorage = authTokenService.getToken();

const initialState: IauthTokenState = {
  token: tokenFromStorage || null,
  user: tokenFromStorage
    ? (() => {
        const decodedToken: any = jwtDecode(tokenFromStorage);
        return { id: decodedToken.id, role: decodedToken.role };
      })()
    : null,
};

export const authTokenReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token }) => {
    const decodedToken: any = jwtDecode(token);
    
    return {
      ...state,
      token,
      user:{
        id: decodedToken.id,
        role: decodedToken.role,
      }
       
    }
  }),
  on(logout, (state) => ({
    ...state,
    token: null,
    user: null
  }))
);   
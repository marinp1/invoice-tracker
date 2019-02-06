import { SignUpSuccess } from './authActions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { toast } from 'react-toastify';

import AuthAPI from '../Api/auth';
import { getUserAvatar } from '../Api/avatar';

import AppState from '../../types/state';
import { AuthStateType } from '../../types';
import {
  User,
  LoginContent,
  SignUpContent,
  VerificationContent,
} from '../../types/auth';

export interface LoginSuccess {
  type: 'LOGIN_SUCCESS';
  user: User;
}

export interface SignUpSuccess {
  type: 'SIGN_UP_SUCCESS';
}

export interface SetAvatar {
  type: 'SET_AVATAR';
  avatar: string;
}

export interface StartAuthApiCall {
  type: 'START_AUTH_API_CALL';
}

export interface EndAuthApiCall {
  type: 'END_AUTH_API_CALL';
}

export interface ChangeAuthState {
  type: 'CHANGE_AUTH_STATE';
  authState: AuthStateType;
}

export type AuthAction =
  | LoginSuccess
  | SignUpSuccess
  | SetAvatar
  | StartAuthApiCall
  | EndAuthApiCall
  | ChangeAuthState;

type AuthThunkResult<R> = ThunkAction<R, AppState, undefined, AuthAction>;

export type AuthThunkDispatch = ThunkDispatch<AppState, undefined, AuthAction>;

export const getCurrentUser = (): AuthThunkResult<void> => async (
  dispatch,
  getState
) => {
  const authState = getState().auth;
  try {
    const user: User = await AuthAPI.getCurrentUser(authState.authProvider);
    const avatar = await getUserAvatar(user.email);
    dispatch({
      type: 'LOGIN_SUCCESS',
      user: user,
    });
    /*
    dispatch({
      type: 'SET_AVATAR',
      avatar,
    });
    */
  } catch (e) {
    // Do nothing
  }
};

export const signOut = (): AuthThunkResult<void> => async (
  dispatch,
  getState
) => {
  const authState = getState().auth;
  try {
    await AuthAPI.signOut(authState.authProvider);
  } catch (e) {
    toast.error('Sign out failed!');
  }
};

export const login = (data?: LoginContent): AuthThunkResult<void> => async (
  dispatch,
  getState
) => {
  const authState = getState().auth;

  if (!authState.apiCallInProgress) {
    dispatch({
      type: 'START_AUTH_API_CALL',
    });

    try {
      await AuthAPI.login(authState.authProvider, data);
      getCurrentUser()(dispatch, getState, undefined);
    } catch (e) {
      toast.error(e.message);
    }

    dispatch({
      type: 'END_AUTH_API_CALL',
    });
  }
};

export const signUp = (data?: SignUpContent): AuthThunkResult<void> => async (
  dispatch,
  getState
) => {
  const authState = getState().auth;

  if (!authState.apiCallInProgress) {
    dispatch({
      type: 'START_AUTH_API_CALL',
    });
    try {
      await AuthAPI.signUp(authState.authProvider, data);
      dispatch({
        type: 'SIGN_UP_SUCCESS',
      });
      toast.success('Sign up successful! Pleast verify your account.');
    } catch (e) {
      toast.error(e.message);
    }

    dispatch({
      type: 'END_AUTH_API_CALL',
    });
  }
};

export const verifyAccount = (
  data?: VerificationContent
): AuthThunkResult<void> => async (dispatch, getState) => {
  const authState = getState().auth;

  if (!authState.apiCallInProgress) {
    dispatch({
      type: 'START_AUTH_API_CALL',
    });

    try {
      await AuthAPI.verifyAccount(authState.authProvider, data);
      changeAuthState('SignIn')(dispatch, getState, undefined);
      toast.success('Verification successful!');
    } catch (e) {
      toast.error(e.message);
    }

    dispatch({
      type: 'END_AUTH_API_CALL',
    });
  }
};

export const changeAuthState = (
  authState: AuthStateType
): AuthThunkResult<void> => (dispatch, getState) => {
  dispatch({
    type: 'CHANGE_AUTH_STATE',
    authState,
  });
};

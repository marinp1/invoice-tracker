import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Auth } from 'aws-amplify';

import AppState from '../../types/state';

export interface LoginSuccess {
  type: 'LOGIN_SUCCESS';
  user: any;
}

export interface LoginFailure {
  type: 'LOGIN_FAILURE';
}

export interface SignUpSuccess {
  type: 'SIGN_UP_SUCCESS';
}

export interface SignUpFailure {
  type: 'SIGN_UP_FAILURE';
}

export interface StartAuthApiCall {
  type: 'START_AUTH_API_CALL';
}

export interface EndAuthApiCall {
  type: 'END_AUTH_API_CALL';
}

export type AuthAction =
  | LoginSuccess
  | LoginFailure
  | SignUpSuccess
  | SignUpFailure
  | StartAuthApiCall
  | EndAuthApiCall;

type AuthThunkResult<R> = ThunkAction<R, AppState, undefined, AuthAction>;

export type AuthThunkDispatch = ThunkDispatch<AppState, undefined, AuthAction>;

type LoginContent = {
  emailAddress: string;
  password: string;
  rememberMe: boolean;
};

export const login = (data: LoginContent): AuthThunkResult<void> => async (
  dispatch,
  getState
) => {
  if (!getState().auth.apiCallInProgress) {
    dispatch({
      type: 'START_AUTH_API_CALL',
    });

    try {
      const user = await Auth.signIn({
        username: data.emailAddress,
        password: data.password,
      });
      /*
      dispatch({
        type: 'LOGIN_SUCCESS',
        user,
      });
      */
      console.log(user);
    } catch (e) {
      console.log(e);
    }

    dispatch({
      type: 'END_AUTH_API_CALL',
    });
  }
};

export const signUp = (
  email: string,
  password: string
): AuthThunkResult<void> => async (dispatch, getState) => {
  if (!getState().auth.apiCallInProgress) {
    dispatch({
      type: 'START_AUTH_API_CALL',
    });

    try {
      const data = Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
        validationData: [],
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }

    dispatch({
      type: 'END_AUTH_API_CALL',
    });
  }
};

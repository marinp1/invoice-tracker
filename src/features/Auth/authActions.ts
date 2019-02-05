import { SignUpSuccess } from './authActions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { toast } from 'react-toastify';
import { Auth } from 'aws-amplify';

import AppState from '../../types/state';
import { AuthStateType } from '../../types';

import { v1 as uuidv1 } from 'uuid';

export interface LoginSuccess {
  type: 'LOGIN_SUCCESS';
  user: any;
}

export interface LoginFailure {
  type: 'LOGIN_FAILURE';
}

export interface SignUpSuccess {
  type: 'SIGN_UP_SUCCESS';
  user: any;
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

export interface ChangeAuthState {
  type: 'CHANGE_AUTH_STATE';
  authState: AuthStateType;
}

export type AuthAction =
  | LoginSuccess
  | LoginFailure
  | SignUpSuccess
  | SignUpFailure
  | StartAuthApiCall
  | EndAuthApiCall
  | ChangeAuthState;

type AuthThunkResult<R> = ThunkAction<R, AppState, undefined, AuthAction>;

export type AuthThunkDispatch = ThunkDispatch<AppState, undefined, AuthAction>;

export const getCurrentUser = (): AuthThunkResult<void> => async (
  dispatch,
  getState
) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    dispatch({
      type: 'LOGIN_SUCCESS',
      user: user,
    });
  } catch (e) {
    // Do nothing
  }
};

export const signOut = (): AuthThunkResult<void> => async (
  dispatch,
  getState
) => {
  try {
    await Auth.signOut();
    window.location.reload();
  } catch (e) {
    toast.error('Sign out failed!');
  }
};

type LoginContent = {
  username: string;
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
      const result = await Auth.signIn({
        username: data.username,
        password: data.password,
      });
      dispatch({
        type: 'LOGIN_SUCCESS',
        user: result.user,
      });
    } catch (e) {
      toast.error(e.message);
    }

    dispatch({
      type: 'END_AUTH_API_CALL',
    });
  }
};

type SignUpContent = {
  firstName: string;
  username: string;
  emailAddress: string;
  password: string;
};

export const signUp = (data: SignUpContent): AuthThunkResult<void> => async (
  dispatch,
  getState
) => {
  if (!getState().auth.apiCallInProgress) {
    dispatch({
      type: 'START_AUTH_API_CALL',
    });
    try {
      const result = await Auth.signUp({
        username: data.username,
        password: data.password,
        attributes: {
          given_name: data.firstName,
          email: data.emailAddress,
        },
        validationData: [],
      });
      dispatch({
        type: 'SIGN_UP_SUCCESS',
        user: result.user,
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

type VerificationContent = {
  username: string;
  verificationCode: string;
};

export const verifyAccount = (
  data: VerificationContent
): AuthThunkResult<void> => async (dispatch, getState) => {
  if (!getState().auth.apiCallInProgress) {
    dispatch({
      type: 'START_AUTH_API_CALL',
    });

    try {
      await Auth.confirmSignUp(data.username, data.verificationCode, {
        forceAliasCreation: true,
      });
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

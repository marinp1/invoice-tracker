import { AuthState } from '../../types/state';
import { AuthAction } from './authActions';
import { AuthProvider } from '../../types/auth';

const initialState: AuthState = {
  apiCallInProgress: false,
  authState: 'SignIn',
  currentUser: null,
  previousSession: {},
  userAvatar: null,
  authProvider: AuthProvider.AWS,
};

function appReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case 'START_AUTH_API_CALL':
      return {
        ...state,
        apiCallInProgress: true,
      };
    case 'END_AUTH_API_CALL':
      return {
        ...state,
        apiCallInProgress: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authState: 'Welcome',
        currentUser: action.user,
        previousSession: {},
      };
    case 'SET_AVATAR':
      return {
        ...state,
        userAvatar: action.avatar,
      };
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        authState: 'Verify',
      };
    case 'CHANGE_AUTH_STATE':
      return {
        ...state,
        authState: action.authState,
      };
    case 'CHANGE_AUTH_PROVIDER':
      return {
        ...state,
        authProvider: action.provider,
      };
    case 'GET_PREVIOUS_SESSION':
      return {
        ...state,
        previousSession: action.session,
      };
    default:
      return state;
  }
}

export default appReducer;

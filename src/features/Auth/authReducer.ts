import { AuthState } from '../../types/state';
import { AuthAction } from './authActions';

const initialState: AuthState = {
  apiCallInProgress: false,
  authState: 'SignIn',
  currentUser: null,
  userAvatar: null,
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
        currentUser: action.user,
      };
    case 'SIGN_UP_FAILURE':
      return {
        ...state,
        currentUser: null,
        userAvatar: null,
      };
    case 'CHANGE_AUTH_STATE':
      return {
        ...state,
        authState: action.authState,
      };
    default:
      return state;
  }
}

export default appReducer;

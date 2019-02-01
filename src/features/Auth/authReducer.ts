import { AuthState } from '../../types/state';
import { AuthAction } from './authActions';

const initialState: AuthState = {
  apiCallInProgress: false,
  authState: 'SignIn',
  currentUser: null,
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
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        authState: 'Verify',
      };
    case 'SIGN_UP_FAILURE':
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
}

export default appReducer;

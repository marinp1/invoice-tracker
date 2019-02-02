import { AuthStateType } from './index';

export interface AuthState {
  apiCallInProgress: boolean;
  authState: AuthStateType;
  currentUser: any; // FIXME: User type?
}

interface AppState {
  auth: AuthState;
}

export default AppState;

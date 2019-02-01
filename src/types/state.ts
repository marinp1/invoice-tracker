export interface AuthState {
  apiCallInProgress: boolean;
  authState: 'SignUp' | 'Verify' | 'SignIn' | 'Welcome';
  currentUser: any; // FIXME: User type?
}

interface AppState {
  auth: AuthState;
}

export default AppState;

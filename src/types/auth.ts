import {
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';

export interface CognitoUser {
  attributes: {
    email: string;
    email_verified: boolean;
    given_name: string;
    sub: string;
  };
  authenticationFlowType: string;
  pool: {
    clientId: string;
  };
  signInUserSession: {
    accessToken: CognitoAccessToken;
    idToken: CognitoIdToken;
    refreshToken: CognitoRefreshToken;
  };
  userDataKey: string;
  username: string;
}

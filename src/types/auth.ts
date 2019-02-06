import {
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';

export type AuthProvider = 'AWS' | 'DROPBOX';

export interface User {
  email: string;
  name?: string;
  username?: string;
}

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

export type LoginContent = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export type SignUpContent = {
  firstName: string;
  username: string;
  emailAddress: string;
  password: string;
};

export type VerificationContent = {
  username: string;
  verificationCode: string;
};

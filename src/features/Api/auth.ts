import { Auth } from 'aws-amplify';

import {
  AuthProvider,
  User,
  CognitoUser,
  LoginContent,
  SignUpContent,
  VerificationContent,
} from '../../types/auth';

const getCurrentUser = async (provider: AuthProvider): Promise<User> => {
  switch (provider) {
    case AuthProvider.AWS:
      const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();
      return Promise.resolve({
        name: cognitoUser.attributes.given_name,
        email: cognitoUser.attributes.email,
        username: cognitoUser.username,
      });
    case AuthProvider.DROPBOX:
      return Promise.resolve({
        name: 'Patrk',
        email: 'demo@patrik',
      });
  }
};

const login = async (
  provider: AuthProvider,
  data?: LoginContent
): Promise<boolean> => {
  switch (provider) {
    case AuthProvider.AWS:
      const loginData = data as LoginContent;
      await Auth.signIn({
        username: loginData.username,
        password: loginData.password,
      });
      return Promise.resolve(true);
    case AuthProvider.DROPBOX:
      return Promise.resolve(true);
  }
};

const signUp = async (
  provider: AuthProvider,
  data?: SignUpContent
): Promise<boolean> => {
  switch (provider) {
    case AuthProvider.AWS:
      const signUpData = data as SignUpContent;
      await Auth.signUp({
        username: signUpData.username,
        password: signUpData.password,
        attributes: {
          given_name: signUpData.firstName,
          email: signUpData.emailAddress,
        },
        validationData: [],
      });
      return Promise.resolve(true);
    case AuthProvider.DROPBOX:
      return Promise.resolve(true);
  }
};

const signOut = async (provider: AuthProvider): Promise<void> => {
  switch (provider) {
    case AuthProvider.AWS:
      await Auth.signOut();
      return Promise.resolve(window.location.reload());
    case AuthProvider.DROPBOX:
      return Promise.resolve(window.location.reload());
  }
};

const verifyAccount = async (
  provider: AuthProvider,
  data?: VerificationContent
): Promise<boolean> => {
  switch (provider) {
    case AuthProvider.AWS:
      const verificatonData = data as VerificationContent;
      await Auth.confirmSignUp(
        verificatonData.username,
        verificatonData.verificationCode,
        {
          forceAliasCreation: true,
        }
      );
      return Promise.resolve(true);
    case AuthProvider.DROPBOX:
      return Promise.resolve(true);
  }
};

export default {
  getCurrentUser,
  login,
  signOut,
  signUp,
  verifyAccount,
};

import * as React from 'react';

/*
import SignIn from './SignIn';
import SignUp from './SignUp';
import Verify from './Verify';
import Welcome from './Welcome';
*/

import { Auth } from 'aws-amplify';

type AuthenticationStatus = 'SignUp' | 'Verify' | 'SignIn' | 'Welcome';

interface State {
  username: string;
  email: string;
  password: string;
  code: string;
  user: any;
  status: AuthenticationStatus;
}

export default class Authentication extends React.PureComponent<{}, State> {
  state: State = {
    username: '',
    email: '',
    password: '',
    code: '',
    user: null, // will contain our user data object when signed in
    status: 'SignUp',
  };

  componentDidMount() {
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(data => {
        let user = { username: data.username, ...data.attributes };
        if (user.email_verified) this.setState({ user, status: 'Welcome' });
      })
      .catch(err => console.log(err));
  }

  AuthComponent = () => {
    return null;
    /*
    switch (this.state.status) {
      case 'SignUp':
        return (
          <SignUp
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );

      case 'Verify':
        return (
          <Verify
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );

      case 'SignIn':
        return (
          <SignIn
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );

      case 'Welcome':
        return <Welcome />;

      default:
        return (
          <SignUp
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );
    }
    */
  };

  switchComponent = (status: AuthenticationStatus) => {
    this.setState({ status });
  };

  render() {
    return <React.Fragment>{this.AuthComponent()}</React.Fragment>;
  }
}

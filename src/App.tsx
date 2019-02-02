import React from 'react';
import { connect } from 'react-redux';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { Authenticator } from 'aws-amplify-react';
Amplify.configure(awsConfig);

import LoginScreen from './features/Auth';
import AppState from './types/state';

interface Props {
  authState: 'SignUp' | 'Verify' | 'SignIn' | 'Welcome';
}

class App extends React.Component<Props> {
  render() {
    return (
      <div className="window">
        <div className="window-content">
          {this.props.authState !== 'Welcome' ? (
            <LoginScreen authState={this.props.authState} />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): Props => ({
  authState: state.auth.authState,
});

export default connect(
  mapStateToProps,
  null
)(App);

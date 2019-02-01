import React, { Component } from 'react';

import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { Authenticator } from 'aws-amplify-react';
Amplify.configure(awsConfig);

import LoginScreen from './features/Auth';

class App extends Component {
  render() {
    return (
      <div className="window">
        <div className="window-content">
          <LoginScreen />
        </div>
      </div>
    );
  }
}

export default App;

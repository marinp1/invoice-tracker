import React from 'react';
import { connect } from 'react-redux';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
Amplify.configure(awsConfig);

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginScreen from './features/Auth';
import InvoiceScreen from './features/InvoiceScreen';
import AppState from './types/state';
import { AuthStateType } from './types';

interface Props {
  authState: AuthStateType;
}

class App extends React.Component<Props> {
  componentDidMount() {
    console.log(window.location.href);
  }

  render() {
    return (
      <div className="window">
        <ToastContainer />
        <div className="window-content">
          {this.props.authState !== 'Welcome' ? (
            <LoginScreen authState={this.props.authState} />
          ) : (
            <InvoiceScreen />
          )}
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

import * as React from 'react';
import { connect } from 'react-redux';
import posed, { PoseGroup } from 'react-pose';

import Providers from './Providers';
import LoadingScreen from '../Utils/LoadingScreen';

import AppState from '../../types/state';
import { AuthStateType } from '../../types';

import { Container, Header, VersionNumber } from './styled';
import {
  AuthThunkDispatch,
  getCurrentUser,
  changeAuthProvider,
} from './authActions';
import { AuthProvider } from '../../types/auth';

const Modal = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'tween', ease: 'linear' },
      default: { duration: 300 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
});

interface OwnProps {
  authState: AuthStateType;
}

interface ReduxStateProps {
  currentAuthProvider: AuthProvider;
  apiCallInProgress: boolean;
}

interface ReduxDispatchProps {
  getCurrentUser: () => void;
  changeAuthProvider: (authProvider: AuthProvider) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

interface State {
  isVisible: boolean;
}

class LoginScreen extends React.Component<Props, State> {
  state: State = {
    isVisible: false,
  };

  componentDidMount() {
    this.setState({
      isVisible: true,
    });
  }

  mapStateToText = () => {
    switch (this.props.authState) {
      case 'SignIn': {
        return 'Signing in...';
      }
      case 'SignUp': {
        return 'Creating account...';
      }
      case 'Verify': {
        return 'Verifying...';
      }
      case 'Welcome': {
        return 'Loading...';
      }
    }
  };

  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <Container>
        <PoseGroup>
          {this.state.isVisible && [
            <Modal
              key="dialog"
              className="dialogContainer"
              style={{ overflow: 'hidden' }}
            >
              <LoadingScreen
                visible={this.props.apiCallInProgress}
                text={this.mapStateToText()}
              />
              <VersionNumber>v0.1.0</VersionNumber>
              <Header>
                <h1>INVOICE TRACKER</h1>
                <button
                  onClick={() =>
                    this.props.changeAuthProvider(
                      this.props.currentAuthProvider === 'AWS'
                        ? 'DROPBOX'
                        : 'AWS'
                    )
                  }
                >
                  Change provider
                </button>
              </Header>
              <Providers
                currentAuthProvider={this.props.currentAuthProvider}
                authState={this.props.authState}
              />
            </Modal>,
          ]}
        </PoseGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState): ReduxStateProps => ({
  apiCallInProgress: state.auth.apiCallInProgress,
  currentAuthProvider: state.auth.authProvider,
});

const mapDispatchToProps = (
  dispatch: AuthThunkDispatch
): ReduxDispatchProps => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  changeAuthProvider: (authProvider: AuthProvider) =>
    dispatch(changeAuthProvider(authProvider)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

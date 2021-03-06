/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

import { connect } from 'react-redux';
import posed, { PoseGroup } from 'react-pose';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

import Providers from './Providers';
import ProviderToggle from './ProviderToggle';
import LoadingScreen from '../Utils/LoadingScreen';

import {
  AuthThunkDispatch,
  getPreviousSession,
  changeAuthProvider,
  usePreviousSession,
} from './authActions';

import {
  Container,
  Header,
  VersionNumber,
  sessionContainerCss,
} from './styled';

import AppState from '../../types/state';
import { AuthStateType } from '../../types';
import { AuthProvider, User } from '../../types/auth';

import { COLORS } from '../../styles';

const { AWS, DROPBOX } = AuthProvider;

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

const PosedSessionContainer = posed.div({
  AWS: {
    background: COLORS.GREEN,
  },
  DROPBOX: {
    background: COLORS.MAIN_BLUE,
  },
});

interface OwnProps {
  authState: AuthStateType;
}

interface ReduxStateProps {
  previousSession: Partial<{ [provider in AuthProvider]: User }>;
  currentAuthProvider: AuthProvider;
  apiCallInProgress: boolean;
}

interface ReduxDispatchProps {
  getPreviousSession: () => void;
  usePreviousSession: () => void;
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
    this.props.getPreviousSession();
  }

  handleToggleChange = () => {
    this.props.changeAuthProvider(
      this.props.currentAuthProvider === AWS ? DROPBOX : AWS
    );
  };

  render() {
    const currentUser: undefined | User = this.props.previousSession[
      this.props.currentAuthProvider
    ];

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
                <h1>Payminder</h1>
                <ProviderToggle
                  authProvider={this.props.currentAuthProvider}
                  onToggle={this.handleToggleChange}
                />
              </Header>
              {currentUser && (
                <PosedSessionContainer
                  pose={this.props.currentAuthProvider}
                  className={`${sessionContainerCss}`}
                  onClick={() => this.props.usePreviousSession()}
                >
                  Continue as <strong>{currentUser.email}</strong>
                  <FontAwesomeIcon
                    icon={Icons.faSignInAlt}
                    style={{ marginLeft: '0.3rem' }}
                  />
                </PosedSessionContainer>
              )}
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
  previousSession: state.auth.previousSession,
  apiCallInProgress: state.auth.apiCallInProgress,
  currentAuthProvider: state.auth.authProvider,
});

const mapDispatchToProps = (
  dispatch: AuthThunkDispatch
): ReduxDispatchProps => ({
  getPreviousSession: () => dispatch(getPreviousSession()),
  usePreviousSession: () => dispatch(usePreviousSession()),
  changeAuthProvider: (authProvider: AuthProvider) =>
    dispatch(changeAuthProvider(authProvider)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

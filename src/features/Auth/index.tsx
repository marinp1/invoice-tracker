import * as React from 'react';
import { connect } from 'react-redux';
import posed, { PoseGroup } from 'react-pose';

import CustomButton from '../Utils/CustomButton';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

import LoadingScreen from '../Utils/LoadingScreen';

import AppState from '../../types/state';

import { Container, ButtonGroup, FormContainer } from './styled';

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

interface Props {
  authState: 'SignUp' | 'Verify' | 'SignIn' | 'Welcome';
  apiCallInProgress: boolean;
}

interface State {
  currentView: 'login' | 'signup';
  isVisible: boolean;
}

class LoginScreen extends React.Component<Props, State> {
  state: State = {
    currentView: 'login',
    isVisible: false,
  };

  componentDidMount() {
    this.setState({
      isVisible: true,
    });
  }

  changeScreen = () => {
    const nextView = this.state.currentView === 'login' ? 'signup' : 'login';
    this.setState({
      currentView: nextView,
    });
  };

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

  render() {
    return (
      <Container>
        <PoseGroup>
          {this.state.isVisible && (
            <Modal key="dialog" className="dialogContainer">
              {this.props.apiCallInProgress && (
                <LoadingScreen text={this.mapStateToText()} />
              )}
              <h1>INVOICE TRACKER</h1>
              <ButtonGroup>
                <CustomButton
                  className={this.state.currentView === 'login' ? 'active' : ''}
                  disabled={this.state.currentView === 'login'}
                  onClick={() => this.changeScreen()}
                  theme={
                    this.state.currentView === 'login' ? 'default' : 'primary'
                  }
                >
                  LOGIN
                </CustomButton>
                <CustomButton
                  className={
                    this.state.currentView === 'signup' ? 'active' : ''
                  }
                  disabled={this.state.currentView === 'signup'}
                  onClick={() => this.changeScreen()}
                  theme={
                    this.state.currentView === 'signup' ? 'default' : 'primary'
                  }
                >
                  SIGN UP
                </CustomButton>
              </ButtonGroup>
              <FormContainer>
                {this.state.currentView === 'login' ? (
                  <LoginForm />
                ) : (
                  <RegistrationForm />
                )}
              </FormContainer>
            </Modal>
          )}
        </PoseGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState): Props => ({
  apiCallInProgress: state.auth.apiCallInProgress,
  authState: state.auth.authState,
});

export default connect(
  mapStateToProps,
  null
)(LoginScreen);

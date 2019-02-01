import * as React from 'react';
import posed, { PoseGroup } from 'react-pose';

import CustomButton from '../Utils/CustomButton';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

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

interface State {
  currentView: 'login' | 'signup';
  isVisible: boolean;
}

class LoginScreen extends React.Component<{}, State> {
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

  render() {
    return (
      <Container>
        <PoseGroup>
          {this.state.isVisible && (
            <Modal key="dialog" className="dialogContainer">
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

export default LoginScreen;

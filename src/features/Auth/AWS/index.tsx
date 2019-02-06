import * as React from 'react';

import CustomButton from '../../Utils/CustomButton';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

import { ButtonGroup, FormContainer } from '../styled';
import { AuthStateType } from '../../../types';

interface Props {
  authState: AuthStateType;
}

interface State {
  currentView: 'login' | 'signup';
}

class AWSLogin extends React.Component<Props, State> {
  state: State = {
    currentView: 'login',
  };

  changeScreen = () => {
    const nextView = this.state.currentView === 'login' ? 'signup' : 'login';
    this.setState({
      currentView: nextView,
    });
  };

  render() {
    return (
      <React.Fragment>
        <ButtonGroup>
          <CustomButton
            className={this.state.currentView === 'login' ? 'active' : ''}
            disabled={this.state.currentView === 'login'}
            onClick={() => this.changeScreen()}
            theme={this.state.currentView === 'login' ? 'default' : 'primary'}
          >
            LOGIN
          </CustomButton>
          <CustomButton
            className={this.state.currentView === 'signup' ? 'active' : ''}
            disabled={this.state.currentView === 'signup'}
            onClick={() => this.changeScreen()}
            theme={this.state.currentView === 'signup' ? 'default' : 'primary'}
          >
            SIGN UP
          </CustomButton>
        </ButtonGroup>
        <FormContainer>
          {this.state.currentView === 'login' ? (
            <LoginForm />
          ) : (
            <RegistrationForm authState={this.props.authState} />
          )}
        </FormContainer>
      </React.Fragment>
    );
  }
}

export default AWSLogin;

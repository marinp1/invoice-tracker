import * as React from 'react';

import CustomButton from '../Utils/CustomButton';

import {
  Container,
  DialogContainer,
  ButtonGroup,
  FormContainer,
} from './styled';

interface State {
  currentView: 'login' | 'signup';
}

class LoginScreen extends React.Component<{}, State> {
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
      <Container>
        <DialogContainer>
          <h1>INVOICE TRACKER</h1>
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
              theme={
                this.state.currentView === 'signup' ? 'default' : 'primary'
              }
            >
              SIGN UP
            </CustomButton>
          </ButtonGroup>
          <FormContainer>
            <form>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </form>
          </FormContainer>
        </DialogContainer>
      </Container>
    );
  }
}

export default LoginScreen;

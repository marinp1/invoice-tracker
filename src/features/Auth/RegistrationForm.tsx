import * as React from 'react';
import posed from 'react-pose';
import CustomButton from '../Utils/CustomButton';

import { ForgotPasswordDiv } from './styled';

const RegistrationDiv = posed.div({
  registration: {
    height: '100%',
    opacity: 1,
    transition: {
      y: { type: 'tween', ease: 'linear' },
      default: { duration: 300 },
    },
  },
  verification: {
    height: 0,
    opacity: 0,
    transition: {
      y: { type: 'tween', ease: 'linear' },
      default: { duration: 300 },
    },
  },
});

const VerificationDiv = posed.div({
  registration: {
    height: 0,
    opacity: 0,
    transition: {
      y: { type: 'tween', ease: 'linear' },
      default: { duration: 300 },
    },
  },
  verification: {
    height: '100%',
    opacity: 1,
    transition: {
      y: { type: 'tween', ease: 'linear' },
      default: { duration: 300 },
    },
  },
});

interface State {
  view: 'registration' | 'verification';
}

class RegistrationForm extends React.Component<{}, State> {
  state: State = {
    view: 'registration',
  };

  changeView = () => {
    const newView =
      this.state.view === 'registration' ? 'verification' : 'registration';
    this.setState({
      view: newView,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RegistrationDiv
            pose={this.state.view}
            style={{ overflow: 'hidden' }}
          >
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
              <div className="form-group">
                <label>Repeat password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </form>
            <CustomButton
              id="signup-button"
              theme="primary"
              onClick={() => this.changeView()}
            >
              SIGN UP
            </CustomButton>
            <ForgotPasswordDiv>
              <a>Insert verification code</a>
            </ForgotPasswordDiv>
          </RegistrationDiv>
          <VerificationDiv
            pose={this.state.view}
            style={{ overflow: 'hidden' }}
          >
            <form>
              <div className="form-group">
                <label>Verification code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Verification code"
                />
              </div>
            </form>
            <CustomButton
              id="verify-button"
              theme="primary"
              onClick={() => this.changeView()}
            >
              VERIFY
            </CustomButton>
            <ForgotPasswordDiv>
              <a>Back to sign up</a>
            </ForgotPasswordDiv>
          </VerificationDiv>
        </div>
      </React.Fragment>
    );
  }
}

export default RegistrationForm;

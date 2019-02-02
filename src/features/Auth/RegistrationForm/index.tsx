import * as React from 'react';
import { connect } from 'react-redux';
import posed from 'react-pose';

import SignUpForm from './SignUpForm';
import VerificationForm from './VerificationForm';

import { AuthThunkDispatch, changeAuthState } from '../authActions';
import { AuthStateType } from '../../../types';

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

interface Props {
  authState: 'SignUp' | 'Verify' | 'SignIn';
}

interface DispatchProps {
  changeAuthState: (authState: AuthStateType) => void;
}

interface State {
  view: 'registration' | 'verification';
}

class RegistrationForm extends React.Component<Props & DispatchProps, State> {
  state: State = {
    view: 'registration',
  };

  componentDidMount() {
    this.setState({
      view: this.props.authState === 'Verify' ? 'verification' : 'registration',
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    const nextView =
      nextProps.authState === 'Verify' ? 'verification' : 'registration';
    if (nextView !== this.state.view) {
      this.setState({
        view: nextView,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RegistrationDiv
            pose={this.state.view}
            style={{ overflow: 'hidden' }}
          >
            <SignUpForm changeAuthState={this.props.changeAuthState} />
          </RegistrationDiv>
          <VerificationDiv
            pose={this.state.view}
            style={{ overflow: 'hidden' }}
          >
            <VerificationForm changeAuthState={this.props.changeAuthState} />
          </VerificationDiv>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: AuthThunkDispatch) => {
  return {
    changeAuthState: (authState: AuthStateType) =>
      dispatch(changeAuthState(authState)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegistrationForm);

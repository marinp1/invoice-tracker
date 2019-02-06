import * as React from 'react';
import { connect } from 'react-redux';
import posed, { PoseGroup } from 'react-pose';

import AWSLogin from './AWS';

import LoadingScreen from '../Utils/LoadingScreen';

import AppState from '../../types/state';
import { AuthStateType } from '../../types';

import { Container } from './styled';
import { AuthThunkDispatch, getCurrentUser } from './authActions';

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
  apiCallInProgress: boolean;
}

interface ReduxDispatchProps {
  getCurrentUser: () => void;
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
          {this.state.isVisible && (
            <Modal key="dialog" className="dialogContainer">
              <LoadingScreen
                visible={this.props.apiCallInProgress}
                text={this.mapStateToText()}
              />
              <h1>INVOICE TRACKER</h1>
              <AWSLogin authState={this.props.authState} />
            </Modal>
          )}
        </PoseGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState): ReduxStateProps => ({
  apiCallInProgress: state.auth.apiCallInProgress,
});

const mapDispatchToProps = (
  dispatch: AuthThunkDispatch
): ReduxDispatchProps => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

import * as React from 'react';
import posed from 'react-pose';

import AWSLogin from './AWS';

import { AuthProvider } from '../../types/auth';
import { AuthStateType } from '../../types';

const AWSProviderContainer = posed.div({
  visible: {
    x: 0,
    transition: { duration: 500 },
  },
  hidden: {
    x: '-120%',
    transition: { duration: 500 },
  },
});

const DropboxProviderContainer = posed.div({
  visible: {
    x: '-100%',
    transition: { duration: 500 },
  },
  hidden: {
    x: '20%',
    transition: { duration: 500 },
  },
});

interface Props {
  currentAuthProvider: AuthProvider;
  authState: AuthStateType;
}

interface State {
  selectedProvider: AuthProvider;
}

class Providers extends React.Component<Props> {
  state: State = {
    selectedProvider: this.props.currentAuthProvider,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.currentAuthProvider !== this.state.selectedProvider) {
      this.setState({
        selectedProvider: nextProps.currentAuthProvider,
      });
    }
  }

  render() {
    return (
      <div style={{ position: 'relative', height: 'auto', display: 'flex' }}>
        <AWSProviderContainer
          style={{ minWidth: '100%' }}
          key="aws-login"
          pose={
            this.state.selectedProvider === AuthProvider.AWS
              ? 'visible'
              : 'hidden'
          }
        >
          <AWSLogin authState={this.props.authState} />
        </AWSProviderContainer>
        <DropboxProviderContainer
          key="dropbox-login"
          style={{ minWidth: '100%' }}
          pose={
            this.state.selectedProvider === AuthProvider.DROPBOX
              ? 'visible'
              : 'hidden'
          }
        >
          <AWSLogin authState={this.props.authState} />
        </DropboxProviderContainer>
      </div>
    );
  }
}

export default Providers;

import * as React from 'react';
import { connect } from 'react-redux';
import posed, { PoseGroup } from 'react-pose';

import SidePane from './SidePane';
import ListView from './ListView';
import InvoiceView from './InvoiceView';

import { InvoiceThunkDispatch, getInvoices } from './invoiceActions';

import AppState from '../../types/state';

import LoadingScreen from '../Utils/LoadingScreen';

interface ReduxDispatchProps {
  getInvoices: () => void;
}

interface ReduxStateProps {
  apiCallInProgress: boolean;
}

interface State {
  loading: boolean;
}

class InvoiceScreen extends React.Component<
  ReduxDispatchProps & ReduxStateProps,
  State
> {
  state: State = {
    loading: false,
  };

  componentDidMount() {
    this.props.getInvoices();
  }

  componentDidUpdate(prevProps: ReduxDispatchProps & ReduxStateProps) {
    if (this.props.apiCallInProgress !== prevProps.apiCallInProgress) {
      this.setState({
        loading: this.props.apiCallInProgress,
      });
    }
  }

  render() {
    return (
      <div className="pane-group">
        <SidePane />
        <div
          className="pane"
          style={{
            boxShadow: '10px 0px 7px -1px rgba(0,0,0,0.03)',
            zIndex: 90,
          }}
        >
          <LoadingScreen
            visible={this.props.apiCallInProgress}
            text="Loading..."
            hideHeader
            theme="reversed"
            style={{
              color: 'black',
              background: 'initial',
              marginTop: '3.5rem',
            }}
          />
          <ListView />
        </div>
        <div
          className="pane"
          style={{
            background: '#f5f5f5',
          }}
        >
          <InvoiceView />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): ReduxStateProps => ({
  apiCallInProgress: state.invoice.apiCallInProgress,
});

const mapDispatchToProps = (
  dispatch: InvoiceThunkDispatch
): ReduxDispatchProps => ({
  getInvoices: () => dispatch(getInvoices()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceScreen);

/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

import { connect } from 'react-redux';

import SidePanel from './SidePanel.tsx';
import ListView from './ListView';
import InvoiceView from './InvoiceView';

import { InvoiceThunkDispatch, getInvoices } from './invoiceActions';

import AppState from '../../types/state';

import LoadingScreen from '../Utils/LoadingScreen';

interface ReduxDispatchProps {
  getInvoices: () => void;
}

interface ReduxStateProps {
  apiCallsInProgress: number;
  searchInProgress: boolean;
}

class InvoiceScreen extends React.Component<
  ReduxDispatchProps & ReduxStateProps
> {
  componentDidMount() {
    this.props.getInvoices();
  }

  render() {
    return (
      <div className="pane-group">
        <SidePanel />
        <div
          className="pane"
          style={{
            boxShadow: '10px 0px 7px -1px rgba(0,0,0,0.03)',
            zIndex: 90,
          }}
        >
          <LoadingScreen
            visible={
              this.props.apiCallsInProgress !== 0 || this.props.searchInProgress
            }
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
  apiCallsInProgress: state.invoice.apiCallsInProgress,
  searchInProgress:
    state.invoice.selectedKeyword !== state.invoice.filterString,
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

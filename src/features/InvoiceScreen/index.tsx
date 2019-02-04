import * as React from 'react';
import { connect } from 'react-redux';

import SidePane from './SidePane';
import ListView from './ListView';
import InvoiceView from './InvoiceView';

import { InvoiceThunkDispatch } from './invoiceActions';

import { COLORS } from '../../styles';

interface ReduxDispatchProps {}

class InvoiceScreen extends React.Component<ReduxDispatchProps, {}> {
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

const mapDispatchToProps = (
  dispatch: InvoiceThunkDispatch
): ReduxDispatchProps => ({});

export default connect(
  null,
  mapDispatchToProps
)(InvoiceScreen);

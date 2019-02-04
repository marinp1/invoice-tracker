import * as React from 'react';
import { connect } from 'react-redux';

import SidePane from './SidePane';
import ListView from './ListView';

import { InvoiceThunkDispatch, createInvoice } from './invoiceActions';

import { COLORS } from '../../styles';

interface ReduxDispatchProps {
  createInvoice: () => void;
}

class InvoiceScreen extends React.Component<ReduxDispatchProps, {}> {
  componentDidMount() {
    this.props.createInvoice();
    this.props.createInvoice();
    this.props.createInvoice();
    this.props.createInvoice();
    this.props.createInvoice();
    this.props.createInvoice();
    this.props.createInvoice();
    this.props.createInvoice();
  }

  render() {
    return (
      <div className="pane-group">
        <SidePane />
        <div className="pane">
          <ListView />
        </div>
        <div className="pane" style={{ background: COLORS.MAIN_BLACK }}>
          ...
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: InvoiceThunkDispatch
): ReduxDispatchProps => ({
  createInvoice: () => {
    dispatch(createInvoice());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(InvoiceScreen);

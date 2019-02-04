import * as React from 'react';
import { connect } from 'react-redux';
import {
  InvoiceThunkDispatch,
  unselectInvoice,
  selectInvoice,
} from '../invoiceActions';
import { OpenInvoice } from '../../../types/invoice';
import AppState from '../../../types/state';

type ReduxStateProps = {
  openInvoices: OpenInvoice[];
  selectedInvoiceId: string | null;
};

type ReduxDispatchProps = {
  selectInvoice: (id: string) => void;
  closeInvoice: (id: string) => void;
};

const InvoiceView: React.SFC<ReduxStateProps & ReduxDispatchProps> = props => {
  const selectedInvoice = props.openInvoices.find(
    inv => inv.id === props.selectedInvoiceId
  );

  return (
    <React.Fragment>
      <div className="tab-group">
        {props.openInvoices.map(inv => (
          <div
            onClick={() => props.selectInvoice(inv.id)}
            className={`tab-item${
              inv.id === props.selectedInvoiceId ? ' active' : ''
            }`}
          >
            <span
              className="icon icon-cancel icon-close-tab"
              onClick={() => props.closeInvoice(inv.id)}
            />
            {inv.name}
          </div>
        ))}
      </div>
      {selectedInvoice && (
        <div>
          <h1>{selectedInvoice.id}</h1>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): ReduxStateProps => ({
  openInvoices: state.invoice.openInvoices,
  selectedInvoiceId: state.invoice.selectedInvoiceId,
});

const mapDispatchToProps = (
  dispatch: InvoiceThunkDispatch
): ReduxDispatchProps => ({
  selectInvoice: (id: string) => {
    dispatch(selectInvoice(id));
  },
  closeInvoice: (id: string) => {
    dispatch(unselectInvoice(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceView);

import * as React from 'react';
import { connect } from 'react-redux';

import {
  InvoiceThunkDispatch,
  unselectInvoice,
  selectInvoice,
} from '../invoiceActions';

import { OpenInvoice } from '../../../types/invoice';
import AppState from '../../../types/state';

import InvoiceForm from './InvoiceForm';

import { COLORS } from '../../../styles';

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
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {props.openInvoices.length > 0 ? (
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
              {inv.unsavedChanges && '*'}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={require('./logo.png')} width="100%" />
        </div>
      )}
      {selectedInvoice && (
        <div
          style={{
            background: COLORS.LIGHT_BLUE,
            padding: '1rem 2rem 1rem 2rem',
            flexGrow: 1,
          }}
        >
          <InvoiceForm selectedInvoice={selectedInvoice} />
        </div>
      )}
    </div>
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

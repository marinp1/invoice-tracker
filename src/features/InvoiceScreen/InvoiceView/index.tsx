/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

import { connect } from 'react-redux';

import posed, { PoseGroup } from 'react-pose';

import {
  InvoiceThunkDispatch,
  unselectInvoice,
  selectInvoice,
} from '../invoiceActions';

import { OpenInvoice } from '../../../types/invoice';
import AppState from '../../../types/state';

import InvoiceForm from './InvoiceForm';

const InvoiceFormContainer = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'tween', ease: 'linear' },
      default: { duration: 150 },
    },
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: { duration: 150 },
  },
});

type ReduxStateProps = {
  openInvoices: OpenInvoice[];
  selectedInvoiceId: string | null;
};

type ReduxDispatchProps = {
  selectInvoice: (id: string, selectedInvoiceId: string | null) => void;
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
      {props.openInvoices.length > 0 && (
        <div className="tab-group">
          {props.openInvoices.map(inv => (
            <div
              key={inv.id}
              onClick={() =>
                props.selectInvoice(inv.id, props.selectedInvoiceId)
              }
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
      )}
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
          opacity: selectedInvoice ? 0.02 : 0.05,
        }}
      >
        <img src={require('./logo.png')} width="100%" />
      </div>
      <PoseGroup>
        {props.openInvoices.length > 0 && selectedInvoice && (
          <InvoiceFormContainer
            key="invoiceFormContainer"
            style={{
              zIndex: 10,
              padding: '1rem 2rem 1rem 2rem',
              flexGrow: 1,
            }}
          >
            {props.openInvoices.map(inv => (
              <div
                key={'form-' + inv.id}
                style={{
                  display: inv.id === selectedInvoice.id ? 'block' : 'none',
                }}
              >
                <InvoiceForm selectedInvoice={inv} formName={inv.id} />
              </div>
            ))}
          </InvoiceFormContainer>
        )}
      </PoseGroup>
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
  selectInvoice: (id: string, selectedInvoiceId: string | null) => {
    if (id !== selectedInvoiceId) {
      dispatch(selectInvoice(id));
    }
  },
  closeInvoice: (id: string) => {
    dispatch(unselectInvoice(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceView);

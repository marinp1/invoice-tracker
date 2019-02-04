import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { toast } from 'react-toastify';
import AppState from '../../types/state';

import { Invoice, Category, DueDateCategory } from '../../types/invoice';

import { v1 as uuidv1 } from 'uuid';

export interface CreateInvoice {
  type: 'CREATE_INVOICE';
  invoice: Invoice;
}

export interface DeleteInvoice {
  type: 'DELETE_INVOICE';
}

export interface FetchInvoices {
  type: 'FETCH_INVOICES';
}

export interface MarkInvoiceAsPaid {
  type: 'MARK_INVOICE_AS_PAID';
}

export interface EditInvoice {
  type: 'EDIT_INVOICE';
}

export interface SelectDueDateCategory {
  type: 'SELECT_DUE_DATE_CATEGORY';
  dueDateCategory: DueDateCategory;
}

export type InvoiceAction =
  | CreateInvoice
  | DeleteInvoice
  | FetchInvoices
  | MarkInvoiceAsPaid
  | EditInvoice
  | SelectDueDateCategory;

type InvoiceThunkResult<R> = ThunkAction<R, AppState, undefined, InvoiceAction>;

export type InvoiceThunkDispatch = ThunkDispatch<
  AppState,
  undefined,
  InvoiceAction
>;

// FIXME: invoice as param
export const createInvoice = (): InvoiceThunkResult<void> => async (
  dispatch,
  getState
) => {
  const invoice: Invoice = {
    id: uuidv1(),
    amount: Math.random() * 5400 + 600,
    companyName: 'Random company',
    category: Category.Electricity,
    dueDate: '2020-02-16',
    paid: Math.random() > 0.5,
  };
  dispatch({
    type: 'CREATE_INVOICE',
    invoice,
  });
  toast.success('Invoice created!');
};

export const selectDueDateCategory = (
  dueDateCategory: DueDateCategory
): InvoiceThunkResult<void> => (dispatch, getState) => {
  dispatch({
    type: 'SELECT_DUE_DATE_CATEGORY',
    dueDateCategory,
  });
};
